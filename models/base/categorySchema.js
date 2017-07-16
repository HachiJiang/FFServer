'use strict';

/**
 * Schema for Category
 * Two-level categories
 */
const _ = require('lodash');
const Schema = require('mongoose').Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = require('./itemSchema');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    items: [ItemSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

CategorySchema.pre('update', function(next) {
    _.assign(this, { updatedAt: new Date() });
    next();
});

CategorySchema.plugin(uniqueValidator);

module.exports = CategorySchema;