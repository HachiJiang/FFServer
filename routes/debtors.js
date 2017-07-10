/**
 * Routes for debtors
 */
const express = require('express');
const route = express.Router();

/**
 * GET /
 * Route for getting all debtors
 */
route.get('/', function(req, res) {
    res.send('Get all debtors!');
});

/**
 * POST /
 * Route for creating a new debtor
 */
route.post('/', function(req, res) {
    res.send(`Creating a new debtor!`);
});

/**
 * PUT /
 * Route for updating an existing debtor
 */
route.put('/:debtorId', function(req, res) {
    res.send(`Updating an existing debtor!`);
});

/**
 * DELETE /
 * Route for deleting an existing debtor
 */
route.delete('/:debtorId', function(req, res) {
    res.send(`Deleting an existing debtor!`);
});

module.exports = route;