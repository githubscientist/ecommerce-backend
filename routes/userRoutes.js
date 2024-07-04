// 1. create a router
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// 2. add routes
userRouter.get('/', userController.getData);

// 3. export the router
module.exports = userRouter;