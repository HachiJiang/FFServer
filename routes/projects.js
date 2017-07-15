'use strict';

/**
 * Routes for project categories
 */
const Project = require('../models/project');
const category = require('./category');

const route = category(Project);

module.exports = route;