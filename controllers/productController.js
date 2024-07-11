const Product = require('../models/product');

const productController = {
    // 1. POST /api/products
    createProduct: async (req, res) => {
        try {
            // get the data from the request body
            const { name, description, price, image, category, stock } = req.body;

            if (!req.file) {
                return res.status(400).send({ message: 'Please upload an image' });
            }

            // create a new product
            const newProduct = new Product({
                name,
                description,
                price,
                image: req.file ? req.file.path : 'placeholder.jpg',
                category,
                stock
            });

            // save the product to the database
            const savedProduct = await newProduct.save();

            // return the saved product
            res.status(201).send({ message: 'Product created successfully', product: savedProduct });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    // 2. GET /api/products
    getAllProducts: async (req, res) => {
        try {
            // get all products from the database
            const products = await Product.find();

            // return the products
            res.send({ message: 'All products', products });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 3. GET /api/products/:id
    getProductById: async (req, res) => {
        try {
            // get the product id from the request parameters
            const productId = req.params.id;

            // find the product by id
            const product = await Product.findById(productId);

            // if the product does not exist, return an error
            if (!product) {
                return res.send({ message: 'Product does not exist' });
            }

            // return the product
            res.send({ message: 'Product', product });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 4. PUT /api/products/:id
    updateProduct: async (req, res) => {
        try {
            // get the product id from the request parameters
            const productId = req.params.id;

            // get the data from the request body
            const { name, description, price, image, category, stock } = req.body;

            // find the product by id and update it
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                name,
                description,
                price,
                image,
                category,
                stock
            }, { new: true });

            // return the updated product
            res.send({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 5. DELETE /api/products/:id
    deleteProduct: async (req, res) => {
        try {
            // get the product id from the request parameters
            const productId = req.params.id;

            // find the product by id and delete it
            const deletedProduct = await Product.findByIdAndDelete(productId);

            // if the product does not exist, return an error
            if (!deletedProduct) {
                return res.send({ message: 'Product does not exist' });
            }

            // return a success message
            res.send({ message: 'Product deleted successfully' });
        } catch (error) {
            res.send({ message: error.message });
        }
    }
}

module.exports = productController;