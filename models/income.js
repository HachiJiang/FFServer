'use strict';

/**
 * Model for Income
 */
const mongoose = require('mongoose');
const IncomeSchema = require('./factory/categorySchemaCreator')();

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;