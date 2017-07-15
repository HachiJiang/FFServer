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
    date_created: {
        type: Date,
        required: true
    },
    date_updated: {
        type: Date
    },
    location: {
        type: String  // id, content can be updated
    },
    tips: {
        type: String
    }
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;