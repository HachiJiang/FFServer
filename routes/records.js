'use strict';

/**
 * Routes for records
 */
const express = require('express');
const route = express.Router();

const Record = require('../models/record');

/**
 * GET /from/:fromDate/to:toDate
 * Route for records of specific date range
 */
route.get('/from/:fYear/:fMonth/:fDay/to/:tYear/:tMonth/:tDay', function(req, res) {

});

/**
 * POST /
 * Route for creating a new record
 */
route.post('/', function(req, res, next) {
    const { type, amount, category, accountFrom, accountTo, project, member, location, tips } = req.body;

    Record.create({ type, amount, category, accountFrom, accountTo, project, member, location, tips }, function(err, cat) {
        if (err) return next(err);
        res.status(201);
        res.json(cat);
    });
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