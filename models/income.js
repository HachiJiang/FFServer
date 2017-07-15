'use strict';

/**
 * Model for Income
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const IncomeSchema = require('./category');

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;