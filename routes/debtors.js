'use strict';

/**
 * Routes for debtors
 */
const Debtor = require('../models/debtor');
const item = require('./factory/itemRouteCreator');

const route = item(Debtor);

module.exports = route;