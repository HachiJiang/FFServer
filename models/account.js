'use strict';

/**
 * Model for Account
 */
const mongoose = require('mongoose');
const AccountSchema = require('./factory/categorySchemaCreator')();

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;