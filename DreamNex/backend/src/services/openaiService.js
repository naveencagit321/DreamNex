const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const generateResponse = async (prompt) => {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        throw new Error('Failed to generate response from AI');
    }
};

module.exports = {
    generateResponse,
};