// 1. create a router
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

userRouter.get('/checkAuth', userController.checkAuth);

// 2. add routes
// userRouter.get('/', userController.getData);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', auth.verifyToken, userController.logout);
userRouter.get('/profile', auth.verifyToken, userController.getProfile);
userRouter.put('/profile', auth.verifyToken, userController.updateProfile);
userRouter.delete('/profile', auth.verifyToken, userController.deleteProfile);

// admin routes
userRouter.get('/admin/users', auth.verifyToken, auth.isAdmin, userController.getUsers);
userRouter.get('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.getUser);
userRouter.put('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.updateUser);
userRouter.delete('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.deleteUser);

// 3. export the router
module.exports = userRouter;