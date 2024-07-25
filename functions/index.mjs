import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

const analyzeCode = functions.https.onRequest(async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const { code1, code2 } = req.body;

    const analyze = async (code) => {
        try {
            console.log('Sending request to OpenAI API with code:', code);
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${functions.config().openai.key}` // Use Firebase environment variable
                },
                body: JSON.stringify({
                    model: "gpt-4", // or "gpt-3.5-turbo"
                    messages: [
                        { "role": "system", "content": "You are a helpful assistant." },
                        { "role": "user", "content": `Analyze the time and space complexity of the following code:\n\n${code}` }
                    ],
                    max_tokens: 60
                })
            });

            if (!response.ok) {
                console.error('OpenAI API request failed:', response.statusText);
                throw new Error(`OpenAI API request failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Received data from OpenAI API:', data);

            if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
                console.error('Invalid response from OpenAI API:', data);
                throw new Error('Invalid response from OpenAI API');
            }

            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error during API request:', error);
            throw error;
        }
    };

    try {
        console.log('Received request with code1:', code1);
        console.log('Received request with code2:', code2);

        const result1 = await analyze(code1);
        const result2 = await analyze(code2);

        console.log('Analysis result for code1:', result1);
        console.log('Analysis result for code2:', result2);

        res.json({ code1: result1, code2: result2 });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.status(500).send(`Error analyzing code: ${error.message}`);
    }
});

export { analyzeCode };
