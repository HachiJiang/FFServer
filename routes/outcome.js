'use strict';

/**
 * Routes for outcome categories
 */
const Outcome = require('../models/outcome');
const category = require('./category');

const route = category(Outcome);

module.exports = route;