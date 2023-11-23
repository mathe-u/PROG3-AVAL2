const express = require('express');
const endpoints = require('./endpoints.js');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/candidate-search', endpoints.candidate);

app.post('/candidate-query', endpoints.fullCandidate);

app.get('/electoral-position', endpoints.positions);

app.post('/candidate-position', endpoints.fullPositions);

console.log('Server on. Listen on port 3001');

app.listen(3001);
