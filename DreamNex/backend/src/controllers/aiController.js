const OpenAI = require('../services/openaiService');

// Function to handle AI requests
exports.handleAIRequest = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await OpenAI.generateResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};