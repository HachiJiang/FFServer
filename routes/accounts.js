'use strict';

/**
 * Routes for account categories
 */
const Account = require('../models/account');
const category = require('./factory/categoryRouteCreator');

const route = category(Account);

module.exports = route;