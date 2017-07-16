'use strict';

/**
 * Model for Debtor
 */
const mongoose = require('mongoose');
const DebtorSchema = require('./base/itemSchema');

const Debtor = mongoose.model('Debtor', DebtorSchema);

module.exports = Debtor;