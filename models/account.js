'use strict';

/**
 * Model for Account
 */
const mongoose = require('mongoose');
const AccountSchema = require('./base/categorySchema');

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;