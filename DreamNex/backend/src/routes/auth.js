const express = require('express');
const { signUp, login } = require('../controllers/authController');
const { validateSignUp, validateLogin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', validateSignUp, signUp);
router.post('/login', validateLogin, login);

module.exports = router;