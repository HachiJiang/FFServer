'use strict';

/**
 * Routes for income categories
 */
const Income = require('../models/income');
const category = require('./category');

const route = category(Income);

module.exports = route;