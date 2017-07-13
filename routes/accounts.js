'use strict';

/**
 * Routes for account types
 */
const express = require('express');
const route = express.Router();

/**
 * GET /
 * Route for getting all account types
 */
route.get('/', function(req, res) {
    res.send('Get all account types!');
});

/**
 * POST /
 * Route for creating a new account category
 */
route.post('/', function(req, res) {
    res.send(`Creating a new account category!`);
});

/**
 * PUT /
 * Route for updating an existing account category
 */
route.put('/:catId', function(req, res) {
    res.send(`Updating an existing account category!`);
});

/**
 * DELETE /
 * Route for deleting an existing account category
 */
route.delete('/:catId', function(req, res) {
    res.send(`Deleting an existing account category!`);
});

module.exports = route;