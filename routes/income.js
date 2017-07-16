'use strict';

/**
 * Routes for income categories
 */
const Income = require('../models/income');
const category = require('./factory/categoryRouteCreator');

const route = category(Income);

module.exports = route;