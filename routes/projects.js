/**
 * Routes for project types
 */
const express = require('express');
const route = express.Router();

/**
 * GET /
 * Route for getting all project types
 */
route.get('/', function(req, res) {
    res.send('Get all project types!');
});

/**
 * POST /
 * Route for creating a new project category
 */
route.post('/', function(req, res) {
    res.send(`Creating a new project category!`);
});

/**
 * PUT /
 * Route for updating an existing account category
 */
route.put('/:catId', function(req, res) {
    res.send(`Updating an existing project category!`);
});

/**
 * DELETE /
 * Route for deleting an existing project category
 */
route.delete('/:catId', function(req, res) {
    res.send(`Deleting an existing project category!`);
});

module.exports = route;