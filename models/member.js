/**
 * MemberSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MemberSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

var Member = mongoose.model('Member', MemberSchema);
module.exports = Member;