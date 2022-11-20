const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Cart', Cart);
