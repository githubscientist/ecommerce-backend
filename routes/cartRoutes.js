const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

cartRouter.post('/add', auth.verifyToken, cartController.addItems);
cartRouter.get('/', auth.verifyToken, cartController.getCart);
cartRouter.put('/update', auth.verifyToken, cartController.updateCart);
cartRouter.delete('/delete', auth.verifyToken, cartController.deleteCart);
cartRouter.post('/remove', auth.verifyToken, cartController.removeItem);

module.exports = cartRouter;