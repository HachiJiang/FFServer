'use strict';

/**
 * Routes for records
 */
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const { invalidParamsError, notFoundError } = require('./../utils/errorUtils');

const PAGE_SLICE = 20;  // record number for each page

route.param('rid', function(req, res, next, id) {
    Record.findById(id, function(err, record) {
        if (err) return next(err);
        if (!record) return next(notFoundError());

        req.record = record;
        return next();
    });
});

/**
 * GET /
 * Route for getting latest 20 records
 */
route.get('/', function(req, res) {
    Record.find({}).limit(PAGE_SLICE).exec(function(err, records) {
        if (err) return next(err);
        res.json(records);
    });
});

/**
 * GET /from/:fDate/to/:tDate
 * Route for getting records of specific date range
 */
route.get('/from/:fDate/to/:tDate', function(req, res, next) {
    const fDate = moment(req.params.fDate, 'YYYY-MM-DD', true);
    const tDate = moment(req.params.tDate, 'YYYY-MM-DD', true);

    if (!fDate.isValid() || !tDate.isValid() || tDate.isBefore(fDate)) {
        return next(invalidParamsError());
    }

    Record.find({ consumeDate: { $gte: fDate, $lte: tDate } }, function(err, records) {
        if (err) return next(err);
        res.json(records);
    });
});

/**
 * POST /
 * Route for creating a new record
 */
route.post('/', function(req, res, next) {
    const { type, amount, category, accountFrom, accountTo, project,
        member, consumeDate, location, tips } = req.body;

    Record.create({ type, amount, category, accountFrom, accountTo, project,
        member, consumeDate, location, tips }, function(err, cat) {
        if (err) return next(err);
        res.status(201);
        res.json(cat);
    });
});

/**
 * PUT /records/:rid
 * Route for updating an existing record
 */
route.put('/:rid', function(req, res, next) {
    const { type, amount, category, accountFrom, accountTo, project,
        member, consumeDate, location, tips } = req.body;

    req.record.update({ type, amount, category, accountFrom, accountTo, project,
        member, consumeDate, location, tips }, function(err, result) {
        if (err) return next(err);
        res.json(result);
    })
});

/**
 * DELETE /records/:rid
 * Route for deleting an existing record
 */
route.delete('/:rid', function(req, res, next) {
    req.record.remove(function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

module.exports = route;