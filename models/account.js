'use strict';

/**
 * Model for Account
 */
const mongoose = require('mongoose');
const AccountSchema = require('./factory/categorySchemaCreator')({}, {
    balance: {
        type: Number,
        default: 0
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;