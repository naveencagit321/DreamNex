const express = require('express');
// ...other imports
const { signup, login } = require('../controllers/authController');
// ...other imports

const router = express.Router();

// Line 7 - NO validateSignup, lowercase 'signup'
router.post('/signup', signup);

// Line 8 - NO validateLogin
router.post('/login', login);

module.exports = router;