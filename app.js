const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');

// Creating app 
const app = express();

// Middlewear 
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

// routes 
const toursRoute = require('./routes/v1/tours.route')

app.get("/", (req, res) => {
    res.send("Home Route");
});

app.use('/api/v1/tours', toursRoute);

module.exports = app;