// server.js
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3004', // React development environment
        'https://cwingo.github.io/ReactSite' // Deployed React site
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Data storage (mock database)
const roster = [];
const schedule = [
    { id: 1, team: 'Team A', date: '2024-01-01', location: 'Stadium A', result: 'Win' },
    { id: 2, team: 'Team B', date: '2024-02-01', location: 'Stadium B', result: 'Loss' }
];

// Validation schemas
const playerValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    position: Joi.string().min(2).max(50).required(),
    location: Joi.string().min(2).max(100).required(),
    stats: Joi.array().items(Joi.string().required()).required()
});

// API Endpoints
app.get('/api/roster', (req, res) => {
    res.json(roster);
});

app.post('/api/roster', (req, res) => {
    const { error } = playerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newPlayer = { id: Date.now(), ...req.body };
    roster.push(newPlayer);
    res.status(201).json({ message: 'Player added successfully', player: newPlayer });
});

app.get('/api/schedule', (req, res) => {
    res.json(schedule);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for React routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`ProjectApi is running at http://localhost:${PORT}`);
});
