'use strict';

/**
 * Routes for record types
 */
const express = require('express');
const route = express.Router();

/**
 * GET /
 * Route for getting all record types
 */
route.get('/', function(req, res) {
    res.send('Get all record types!');
});

/**
 * GET /:rType
 * Route for getting all categories of specific record type
 */
route.get('/:rType', function(req, res) {
    const rType = req.params.rType;
    res.send(`Get all categories of record type ${rType}!`);
});

/**
 * PUT /:rType
 * Route for updating category list for specific record type
 */
route.put('/:rType', function(req, res) {
    const rType = req.params.rType;
    res.send(`Creating a new category for record type ${rType}!`);
});

module.exports = route;