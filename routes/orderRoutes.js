const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

orderRouter.post('/', auth.verifyToken, orderController.createOrder);
orderRouter.get('/', auth.verifyToken, orderController.getAllOrders);
orderRouter.get('/:id', auth.verifyToken, orderController.getOrderById);
orderRouter.put('/:id', auth.verifyToken, orderController.updateOrder);
orderRouter.delete('/:id', auth.verifyToken, orderController.deleteOrder);

module.exports = orderRouter;