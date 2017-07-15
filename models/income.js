/**
 * IncomeSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IncomeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    parent: {
        type: String,  // id
        required: true,
        trim: true
    }
});

var Income = mongoose.model('Income', IncomeSchema);
module.exports = Income;