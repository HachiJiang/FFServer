'use strict';

/**
 * Model for Outcome
 */
const mongoose = require('mongoose');
const OutcomeSchema = require('./factory/categorySchemaCreator')();

const Outcome = mongoose.model('Outcome', OutcomeSchema);

module.exports = Outcome;