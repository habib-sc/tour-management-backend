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
const sampleRoute = require('./routes/sample.route');


app.get("/", (req, res) => {
    res.send("Home Route");
});

app.use('/api/v1/sample', sampleRoute);

module.exports = app;