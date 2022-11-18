const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    email: { type: String, required: true, default: '' },
    receiver: { type: String, required: true, default: '' },
    phoneNumber: { type: String, required: true, default: '' },
    address: { type: String, required: true, default: '' },
    quantity: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Order', Order);
