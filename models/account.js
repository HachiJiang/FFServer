/**
 * AccountSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true     // trim the whitespace after email string
    },
    parent: {
        type: String,  // id
        trim: true
    }
});

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;