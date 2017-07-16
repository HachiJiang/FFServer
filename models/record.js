'use strict';

/**
 * Model for Record
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TYPES = ['outcome', 'income', 'transfer', 'borrow', 'lend', 'repay', 'collect_debt'];

const RecordSchema = new Schema({
    type: {
        type: String,
        enum: TYPES,
        required: true,
        trim: true
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
        type: String,  // id, content can be updated,
        trim: true
    },
    tips: {
        type: String,
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

/**
 * Update method for item
 * Seems default "update" cannot get document as "this"
 */
RecordSchema.method('update', function(updates, callback) {
    _.assign(this, updates, { updatedAt: new Date() });
    this.save(callback);
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;