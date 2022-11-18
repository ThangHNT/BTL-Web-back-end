const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    content: { type: String, required: true, default: '', maxLength: 500 },
    time: { type: String, required: true, default: new Date().getTime() },
    star: { type: String, required: true },
});

module.exports = mongoose.model('Comment', Comment);
