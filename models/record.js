/**
 * RecordSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TYPES = ['outcome', 'income', 'transfer', 'borrow', 'lend', 'repay', 'collect_debt'];

const RecordSchema = new Schema({
    type: {
        type: String,
        enum: TYPES,
        required: true,
        trim: true     // trim the whitespace after email string
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,  // id, content can be updated
        required: true
    },
    account: {
        type: String,  // id, content can be updated
        required: true
    },
    project: {
        type: String,  // id, content can be updated
        required: true
    },
    member: {
        type: String,  // id, content can be updated
        required: true
    },
    location: {
        type: String  // id, content can be updated
    },
    tips: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;