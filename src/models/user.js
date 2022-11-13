const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    account: { type: String, maxLength: 30, required: true, minLength: 3 },
    password: { type: String, maxLength: 100, required: true, minLength: 1 },
    email: { type: String, maxLength: 30, minLength: 5 },
    avatar: { type: String },
    phoneNumber: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', User);
