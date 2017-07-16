'use strict';

/**
 * Model for Debtor
 */
const mongoose = require('mongoose');
const DebtorSchema = require('./factory/itemSchemaCreator')();

const Debtor = mongoose.model('Debtor', DebtorSchema);

module.exports = Debtor;