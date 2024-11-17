const express = require('express');
const cors = require('cors'); // Import CORS middleware
const path = require('path');
const Joi = require('joi'); // Import Joi for validation

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local development and deployed React site
app.use(cors({
    origin: [
        'http://localhost:3004', // React development environment
        'https://cwingo.github.io/ReactSite', // Deployed React site
    ],
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Middleware for parsing JSON
app.use(express.json());

// In-memory data storage (replace with a database in production)
let roster = [];
let schedule = [];

// Joi schemas for validation
const rosterSchema = Joi.object({
    name: Joi.string().min(3).required(),
    position: Joi.string().required(),
    location: Joi.string().required(),
    stats: Joi.array().items(Joi.string().required()).min(1).required(),
});

const scheduleSchema = Joi.object({
    team: Joi.string().min(3).required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    result: Joi.string().allow('').optional(),
});

// API endpoints
app.get('/api/schedule', (req, res) => {
    res.json(schedule);
});

app.post('/api/schedule', (req, res) => {
    const { error } = scheduleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const newGame = { id: Date.now(), ...req.body };
    schedule.push(newGame);
    res.status(201).json(newGame);
});

app.get('/api/roster', (req, res) => {
    res.json(roster);
});

app.post('/api/roster', (req, res) => {
    const { error } = rosterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const newPlayer = { id: Date.now(), ...req.body };
    roster.push(newPlayer);
    res.status(201).json(newPlayer);
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
