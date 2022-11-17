const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Evaluate = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    comment: { type: String, required: true, default: '', maxLength: 500 },
    time: { type: String, required: true },
    star: { type: String, required: true },
});

module.exports = mongoose.model('Evaluate', Evaluate);
