const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    size: { type: String },
    gender: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: [String] },
    images: { type: [String] } // Store image URLs or paths
});

module.exports = ProductSchema; // Export the schema itself
