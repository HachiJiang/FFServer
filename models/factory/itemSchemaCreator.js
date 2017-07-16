'use strict';

/**
 * Schema creator for single item
 */
const _ = require('lodash');
const Schema = require('mongoose').Schema;
const uniqueValidator = require('mongoose-unique-validator');

module.exports = function() {
    var ItemSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true/*,
            unique: true*/  // @TODO: sub document cannot apply unique???
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
    ItemSchema.method('update', function(updates, callback) {
        _.assign(this, updates, { updatedAt: new Date() });
        this.save(callback);
    });

    ItemSchema.plugin(uniqueValidator);

    return ItemSchema;
};