const mongoose = require('mongoose');

// create a schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ],
    total: Number,
    status: String
});

// create a model and export it
module.exports = mongoose.model('Order', orderSchema, 'orders');