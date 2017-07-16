'use strict';

/**
 * Schema for single item
 */
const _ = require('lodash');
const Schema = require('mongoose').Schema;
const uniqueValidator = require('mongoose-unique-validator');

var ItemSchema = new Schema({
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

/**
 * Update method for embedded item
 */
ItemSchema.method('updateEmbedded', function(updates, callback) {
    _.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

ItemSchema.plugin(uniqueValidator);

module.exports = ItemSchema;