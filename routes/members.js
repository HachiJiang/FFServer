/**
 * Routes for members
 */
const express = require('express');
const route = express.Router();

/**
 * GET /
 * Route for getting all members
 */
route.get('/', function(req, res) {
    res.send('Get all members!');
});

/**
 * POST /
 * Route for creating a new member
 */
route.post('/', function(req, res) {
    res.send(`Creating a new member!`);
});

/**
 * PUT /
 * Route for updating an existing member
 */
route.put('/:memberId', function(req, res) {
    res.send(`Updating an existing member!`);
});

/**
 * DELETE /
 * Route for deleting an existing member
 */
route.delete('/:memberId', function(req, res) {
    res.send(`Deleting an existing member!`);
});

module.exports = route;