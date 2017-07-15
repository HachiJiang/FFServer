'use strict';

/**
 * Model for Category
 * Two-level categories
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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

ItemSchema.method('update', function(updates, callback) {
    _.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    items: {
        type: [ItemSchema]
    },
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

module.exports = CategorySchema;