'use strict';

/**
 * Routes for records
 */
const express = require('express');
const route = express.Router();

/**
 * GET /from/:fromDate/to:toDate
 * Route for records of specific date range
 */
route.get('/from/:fromDate/to/:toDate', function(req, res) {
    const { fromDate, toDate } = req.params;
    res.send(`Get records from ${fromDate} to ${toDate}`);
});

/**
 * POST /
 * Route for creating a new record
 */
route.post('/', function(req, res) {
    res.send(`Creating a new record ${req.body}`);
});

/**
 * PUT /records/:rid
 * Route for updating an existing record
 */
route.put('/:rid', function(req, res) {
    const rid = req.params.rid;
    res.send(`Updating record ${rid} with ${req.body}`);
});

/**
 * DELETE /records/:rid
 * Route for deleting an existing record
 */
route.delete('/:rid', function(req, res) {
    const rid = req.params.rid;
    res.send(`Deleting record ${rid}`);
});

module.exports = route;