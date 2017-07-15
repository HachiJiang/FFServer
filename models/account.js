/**
 * AccountSchema
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

AccountItemSchema.method('update', function(updates, callback) {
    _.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    items: {
        type: [AccountItemSchema],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

AccountSchema.pre('update', function(next) {
    _.assign(this, { updatedAt: new Date() });
    next();
});

AccountSchema.pre('save', function(next) {
    _.sortBy(this.items, ['createdAt']);
    next();
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;