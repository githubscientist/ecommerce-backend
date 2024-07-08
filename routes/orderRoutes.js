const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

orderRouter.post('/', auth.verifyToken, orderController.createOrder);
orderRouter.get('/', auth.verifyToken, auth.isAdmin, orderController.getAllOrders);
orderRouter.get('/:id', auth.verifyToken, auth.isAdmin, orderController.getOrderById);
orderRouter.put('/:id', auth.verifyToken, auth.isAdmin, orderController.updateOrder);
orderRouter.delete('/:id', auth.verifyToken, auth.isAdmin, orderController.deleteOrder);

module.exports = orderRouter;