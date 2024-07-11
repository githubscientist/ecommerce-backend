const express = require('express');
const productController = require('../controllers/productController');
const productRouter = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

productRouter.post('/', auth.verifyToken, auth.isAdmin, upload.single('image'), productController.createProduct);
productRouter.get('/', auth.verifyToken, productController.getAllProducts);
productRouter.get('/:id', auth.verifyToken, productController.getProductById);
productRouter.put('/:id', auth.verifyToken, auth.isAdmin, productController.updateProduct);
productRouter.delete('/:id', auth.verifyToken, auth.isAdmin, productController.deleteProduct);

module.exports = productRouter;