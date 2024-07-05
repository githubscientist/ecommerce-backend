const express = require('express');
const productController = require('../controllers/productController');
const productRouter = express.Router();
const auth = require('../middleware/auth');

productRouter.post('/', auth.verifyToken, productController.createProduct);
productRouter.get('/', auth.verifyToken, productController.getAllProducts);
productRouter.get('/:id', auth.verifyToken, productController.getProductById);
productRouter.put('/:id', auth.verifyToken, productController.updateProduct);
productRouter.delete('/:id', auth.verifyToken, productController.deleteProduct);

module.exports = productRouter;