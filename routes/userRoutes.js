// 1. create a router
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// 2. add routes
// userRouter.get('/', userController.getData);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/profile', auth.verifyToken, userController.getProfile);

// 3. export the router
module.exports = userRouter;