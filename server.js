// Simple Express backend for local dev
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Example image generation endpoint
app.post('/generate-image', async (req, res) => {
  try {
    // Simulate image generation (replace with real logic)
    const { prompt, aspectRatio, image } = req.body;
    if (!prompt && !image) return res.status(400).json({ error: 'Prompt is required' });
    // Return a placeholder image for local dev
    return res.json({ image: 'https://placehold.co/600x400/png?text=Local+Image' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
