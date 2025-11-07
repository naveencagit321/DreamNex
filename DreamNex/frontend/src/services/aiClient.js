import axios from 'axios';

const aiClient = axios.create({
    baseURL: process.env.REACT_APP_AI_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_AI_API_KEY}`
    }
});

export const getAIResponse = async (prompt) => {
    try {
        const response = await aiClient.post('/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 150
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
};