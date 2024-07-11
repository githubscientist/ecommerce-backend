const mongoose = require('mongoose');

// create a schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: {
        type: String,
        default: 'placeholder.jpg'
    },
    category: String,
    stock: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// create a model and export it
module.exports = mongoose.model('Product', productSchema, 'products');