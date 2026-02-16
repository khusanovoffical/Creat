require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI sozlamalari
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Rasm yaratish marshruti
app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt yuborilmadi" });
        }

        const response = await openai.images.generate({
            model: "dall-e-3", // Eng kuchli model
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        res.json({ url: response.data[0].url });
    } catch (error) {
        console.error("Xatolik:", error.message);
        res.status(500).json({ error: "Rasm yaratishda xatolik yuz berdi" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishlamoqda...` / ));
              
