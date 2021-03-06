'use strict';

/**
 * Schema creator for Category
 * Two-level categories
 */
const _ = require('lodash');
const Schema = require('mongoose').Schema;
const uniqueValidator = require('mongoose-unique-validator');

module.exports = function(props, subProps) {
    const ItemSchema = require('./itemSchemaCreator')(subProps);
    const extraProps = props || {};

    /**
     * Update method for embedded item
     */
    ItemSchema.method('updateEmbedded', function(updates, callback) {
        _.assign(this, updates, { updatedAt: new Date() });
        this.parent().update({}, callback);
    });

    const CategorySchema = new Schema(_.assign({
        name: {
            type: String,
            required: true,
            trim: true/*,
            unique: true*/
        },
        items: [ItemSchema],
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date
        }
    }, extraProps));

    /**
     * Update method for category
     * Seems default "update" cannot get document as "this"
     */
    CategorySchema.method('update', function(updates, callback) {
        _.assign(this, updates, { updatedAt: new Date() });
        this.save(callback);
    });

    CategorySchema.plugin(uniqueValidator);

    return CategorySchema;
};