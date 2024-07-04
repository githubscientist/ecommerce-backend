// import express
const express = require('express');

// create an express app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = app;