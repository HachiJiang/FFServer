/**
 * OutcomeSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OutcomeSchema = new Schema({
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

var Outcome = mongoose.model('Outcome', OutcomeSchema);
module.exports = Outcome;