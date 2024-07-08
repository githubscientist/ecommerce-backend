// import express
const express = require('express');
const userRouter = require('./routes/userRoutes');
const requestLogger = require('./utils/logger');
const unknownEndpoint = require('./utils/Error');
// const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const cartRouter = require('./routes/cartRoutes');

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
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/carts', cartRouter);

app.use(unknownEndpoint);

module.exports = app;