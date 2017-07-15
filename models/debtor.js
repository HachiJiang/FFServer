/**
 * DebtorSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DebtorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

var Debtor = mongoose.model('Debtor', DebtorSchema);
module.exports = Debtor;