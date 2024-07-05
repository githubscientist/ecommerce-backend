// import express
const express = require('express');
const userRouter = require('./routes/userRoutes');
const requestLogger = require('./utils/logger');
const unknownEndpoint = require('./utils/Error');
// const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// create an express app
const app = express();

// app.use(morgan('dev'));

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use('/api/v1/users', userRouter);

app.use(unknownEndpoint);

module.exports = app;