const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;
const NASA_API_KEY = 'Yf0Jif0NBf0O1AoKUrlMLfIged8ADs22ayWuwgCj'; // API key

app.use(cors());

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the NASA Data Visualization API!');
});

// Route to fetch APOD data from NASA API
app.get('/api/nasa/apod', async (req, res) => {
    try {
        const { date } = req.query;
        const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}` + (date ? `&date=${date}` : '');
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching APOD data' });
    }
});

// Mars Rover Photos
app.get('/api/nasa/mars-photos', async (req, res) => {
    try {
        const { rover = 'curiosity', sol = 1000 } = req.query;
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Mars photos' });
    }
});

// EPIC
app.get('/api/nasa/epic', async (req, res) => {
    try {
        const { date } = req.query;
        // If no date, get most recent
        const url = date
            ? `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`
            : `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching EPIC data' });
    }
});

// Near Earth Object Web Service (NeoWs)
app.get('/api/nasa/neo', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching NEO data' });
    }
});

// NASA Image and Video Library
app.get('/api/nasa/images', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Missing search query' });
        }
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q || '')}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});