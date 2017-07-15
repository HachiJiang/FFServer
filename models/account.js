'use strict';

/**
 * Model for Account
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const AccountSchema = require('./category');

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;