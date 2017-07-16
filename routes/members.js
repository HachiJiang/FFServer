'use strict';

/**
 * Routes for members
 */
const Member = require('../models/member');
const item = require('./factory/itemRouteCreator');

const route = item(Member);

module.exports = route;