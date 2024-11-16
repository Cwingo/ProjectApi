const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve API endpoints
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

// Start the server
app.listen(PORT, () => {
  console.log(`ProjectApi is running at http://localhost:${PORT}`);
});
