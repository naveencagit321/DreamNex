/**
 * Simple Express server with MongoDB (Mongoose).
 * - Auth routes: /api/auth/signup, /api/auth/login
 * - Store routes (protected): /api/stores (POST), /api/stores/:id (PUT, DELETE)
 * - Basic error handling and JSON responses
 *
 * Environment variables expected:
 *   MONGO_URI - MongoDB connection string
 *   JWT_SECRET - secret for signing JWTs
 *   PORT - server port (optional, default 5000)
 *
 * Install dependencies:
 *   npm install express mongoose bcryptjs jsonwebtoken cors dotenv
 */

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(cors()); // Allow cross-origin requests (adjust origin in production)

// --- Mongoose connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Added timeout
    socketTimeoutMS: 45000, // Added socket timeout
  })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// --- Schemas & Models ---

// Simple User model for signup/login
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// Store model: owner references User, has simple products array
const productSubSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

const storeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    niche: { type: String },
    description: { type: String },
    products: [productSubSchema],
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

// --- Utility: JWT generation ---
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
function generateToken(user) {
  // Minimal payload: user id and email
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

// --- Auth Middleware (protect routes) ---
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'Missing authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Invalid authorization format' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

// --- Routes ---

// Health check
app.get('/api/ping', (req, res) => res.json({ success: true, message: 'pong' }));

// Auth routes
const authRouter = express.Router();

/**
 * POST /api/auth/signup
 * body: { name, email, password }
 */
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User created',
      data: { user: { id: user._id, name: user.name, email: user.email }, token },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/login
 * body: { email, password }
 */
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      success: true,
      message: 'Authenticated',
      data: { user: { id: user._id, name: user.name, email: user.email }, token },
    });
  } catch (err) {
    next(err);
  }
});

app.use('/api/auth', authRouter);

// Store routes (protected by authMiddleware)
const storeRouter = express.Router();

/**
 * POST /api/stores
 * body: { name, niche, description, products }
 * creates a store owned by the authenticated user
 */
storeRouter.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { name, niche, description, products } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Store name is required' });

    const store = await Store.create({
      owner: req.user.id,
      name,
      niche,
      description,
      products: Array.isArray(products) ? products : [],
    });

    res.status(201).json({ success: true, message: 'Store created', data: store });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/stores/:id
 * body: { name, niche, description, products }
 * updates store if the authenticated user is the owner
 */
storeRouter.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
    if (String(store.owner) !== String(req.user.id)) return res.status(403).json({ success: false, message: 'Forbidden' });

    const updates = ['name', 'niche', 'description', 'products'];
    updates.forEach((field) => {
      if (req.body[field] !== undefined) store[field] = req.body[field];
    });

    await store.save();
    res.json({ success: true, message: 'Store updated', data: store });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/stores/:id
 * deletes the store if the authenticated user is the owner
 */
storeRouter.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
    if (String(store.owner) !== String(req.user.id)) return res.status(403).json({ success: false, message: 'Forbidden' });

    await store.deleteOne();
    res.json({ success: true, message: 'Store deleted' });
  } catch (err) {
    next(err);
  }
});

app.use('/api/stores', storeRouter);

// --- Basic error handler (JSON responses) ---
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app for testing or further composition
module.exports = app;