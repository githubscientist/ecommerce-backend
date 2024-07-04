// import express
const express = require('express');
const userRouter = require('./routes/userRoutes');

// create an express app
const app = express();

app.use('/api/v1', userRouter);

module.exports = app;