const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route to interact with OpenAI API
router.post('/generate', aiController.generateContent);

module.exports = router;