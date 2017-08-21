'use strict';

/**
 * Model for Record
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnumRecordTypes = require('../consts/EnumRecordTypes');

const RecordSchema = new Schema({
    type: {
        type: String,
        enum: _.toArray(EnumRecordTypes),
        required: true,
        trim: true
    },
    amount: {                   // 税后实际金额
        type: Number,
        required: true,
        validate: {
            validator: v => v > 0
        }
    },
    amountPreTax: {             // 税前工资
        type: Number,
        required: function() {
            return this.type === EnumRecordTypes.INCOME;
        },
        validate: {
            validator: v => v >= 0
        }
    },
    bonusPreTax: {              // 税前奖金
        type: Number,
        required: function() {
            return this.type === EnumRecordTypes.INCOME;
        },
        validate: {
            validator: v => v >= 0
        }
    },
    category: {
        type: String,  // id, content can be updated
        required: function() {
            const type = this.type;
            return type === EnumRecordTypes.OUTCOME || type === EnumRecordTypes.INCOME;
        }
    },
    accountFrom: {
        type: String,  // id, content can be updated
        required: function() {
            const type = this.type;
            return type === EnumRecordTypes.OUTCOME ||
                type === EnumRecordTypes.TRANSFER ||
                type === EnumRecordTypes.LEND ||
                type === EnumRecordTypes.REPAY;
        }
    },
    accountTo: {
        type: String,  // id, content can be updated
        required: function() {
            const type = this.type;
            return type === EnumRecordTypes.INCOME ||
                type === EnumRecordTypes.TRANSFER ||
                type === EnumRecordTypes.BORROW ||
                type === EnumRecordTypes.COLLECT_DEBT;
        }
    },
    project: {
        type: String,  // id, content can be updated
        required: true
    },
    member: {
        type: String,  // id, content can be updated
        required: true
    },
    debtor: {
        type: String,  // id, content can be updated
        required: function() {
            const type = this.type;
            return type === EnumRecordTypes.BORROW ||
                type === EnumRecordTypes.LEND ||
                type === EnumRecordTypes.REPAY ||
                type === EnumRecordTypes.COLLECT_DEBT;
        }
    },
    consumeDate: {
        type: Date,
        required: true
    },
    // @TODO: need location service to get standard location name
    // now just leave it empty
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