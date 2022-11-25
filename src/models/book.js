const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = Schema({
    title: { type: String, required: true, maxLength: 50 },
    author: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 1000 },
    releaseDate: { type: String, required: true },
    coverImage: { type: String, required: true },
    price: { type: String, required: true, default: '0đ' },
    category: { type: String, required: true, maxLength: 20 },
    numberOfPage: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', Book);
