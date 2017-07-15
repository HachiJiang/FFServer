'use strict';

/**
 * Model for Outcome
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const OutcomeSchema = require('./category');

const Outcome = mongoose.model('Outcome', OutcomeSchema);

module.exports = Outcome;