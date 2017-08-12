'use strict';

/**
 * Model for Debtor
 */
const mongoose = require('mongoose');
const DebtorSchema = require('./factory/itemSchemaCreator')({
    balance: {
        type: Number,
        default: 0
    }
});

const Debtor = mongoose.model('Debtor', DebtorSchema);

module.exports = Debtor;