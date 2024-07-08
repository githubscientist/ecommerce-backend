const Cart = require("../models/cart");

const cartController = {
    addItems: async (req, res) => {
        try {
            // Get the user ID from the request object
            const userId = req.userId;
            
            // Get the product ID and quantity from the request body
            const { productId, quantity } = req.body;

            // Find the user's cart
            const cart = await Cart.findOne({ user: userId });

            // If the cart does not exist, create a new cart
            if (!cart) {
                const newCart = new Cart({
                    user: userId,
                    products: [{ product: productId, quantity }]
                });
                await newCart.save();
                return res.status(201).json({ message: 'Item added to cart' });
            }

            // If the cart exists, check if the product is already in the cart
            const productIndex = cart.products.findIndex(product => product.product == productId);

            // If the product is not in the cart, add the product to the cart
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity });
                await cart.save();
                return res.status(201).json({ message: 'Item added to cart' });
            }

            // If the product is already in the cart, update the quantity
            cart.products[productIndex].quantity += quantity;
            await cart.save();
            return res.status(201).json({ message: 'Item added to cart' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getCart: async (req, res) => {
        try {
            // get the user ID from the request object
            const userId = req.userId;

            // check if the user has a cart
            const cart = await Cart.findOne({ user: userId });

            // if the user does not have a cart, return an empty array
            if (!cart) {
                return res.status(200).json({ cart: [] });
            }

            // if the user has a cart, populate the products field and return the cart
            await cart.populate('products.product').execPopulate();

            return res.status(200).json({ cart: cart.products });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateCart: async (req, res) => {
        try {
            // Get the user ID from the request object
            const userId = req.userId;

            // Get the product ID and quantity from the request body
            const { productId, quantity } = req.body;

            // Find the user's cart
            const cart = await Cart.findOne({ user: userId });

            // If the cart does not exist, return an error message
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Check if the product is in the cart
            const productIndex = cart.products.findIndex(product => product.product == productId);

            // If the product is not in the cart, return an error message
            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            // Update the quantity of the product in the cart
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json({ message: 'Cart updated' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteCart: (req, res) => {
        try {
            // Get the user ID from the request object
            const userId = req.userId;

            // Find the user's cart and delete it
            Cart.findOneAndDelete({ user: userId }, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(200).json({ message: 'Cart deleted' });
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeItem: async (req, res) => {
        try {
            // Get the user ID from the request object
            const userId = req.userId;

            // Get the product ID from the request parameters
            const productId = req.params.productId;

            // Find the user's cart
            const cart = await Cart.findOne({ user: userId });

            // If the cart does not exist, return an error message
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Check if the product is in the cart
            const productIndex = cart.products.findIndex(product => product.product == productId);

            // If the product is not in the cart, return an error message
            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            // Remove the product from the cart
            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({ message: 'Item removed from cart' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = cartController;