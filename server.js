const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.')); // index.html ni o'qishi uchun

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate', async (req, res) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-2", // Arzonroq model
            prompt: req.body.prompt,
            n: 1,
            size: "512x512",
        });
        res.json({ url: response.data[0].url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app; // Vercel uchun muhim
app.listen(3000);
