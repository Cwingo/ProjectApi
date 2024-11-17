const express = require('express');
const cors = require('cors'); // Import CORS middleware
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local development and deployed React site
app.use(cors({
    origin: [
        'http://localhost:3004', // React development environment
        'https://cwingo.github.io/ReactSite/', // Deployed React site
    ],
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/schedule', (req, res) => {
    const schedule = require('./data/game-schedule.json');
    res.json(schedule);
});

app.get('/api/roster', (req, res) => {
    const roster = require('./data/team-roster.json');
    res.json(roster);
});

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve React app for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`ProjectApi is running at http://localhost:${PORT}`);
});
