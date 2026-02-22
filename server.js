const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI API-ni ulash
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Asosiy rasm yaratish funksiyasi
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Tavsif kiritilmadi!" });
        }

        const response = await openai.images.generate({
            model: "dall-e-2", // Arzonroq va tezroq model
            prompt: prompt,
            n: 1,
            size: "512x512",
        });

        // Rasmni qaytarish
        res.status(200).json({ url: response.data[0].url });
    } catch (error) {
        console.error("Xato tafsiloti:", error.message);
        res.status(500).json({ error: "OpenAI xatosi: " + error.message });
    }
});

module.exports = app;
