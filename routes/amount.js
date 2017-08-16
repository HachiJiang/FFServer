'use strict';

/*
 *
 * Routes for amount, mainly for aggregation data
 *
 */
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const EnumRecordTypes = require('../consts/EnumRecordTypes');

function getFilter({type, fDate, tDate}) {
    const fDateM = moment(fDate);
    const tDateM = moment(tDate);

    if (fDateM.isValid() && tDateM.isValid() && fDateM.isBefore(tDateM) && type) {
        return { consumeDate: { $gte: new Date(fDate), $lte: new Date(tDate) }, type };
    }
}

/**
 * GET /aggregate_by_day/:type/:fDate/:tDate
 * Route for getting aggregated outcome data of specific date range
 */
route.get('/aggregate_by_day/:type/:fDate/:tDate', function(req, res, next) {
    const filter = getFilter(req.params);

    if (!filter) {
        return next(invalidParamsError());
    }

    Record.aggregate([
        { $match: filter },
        { $group: { _id: '$consumeDate', amount: { $sum: '$amount' } } }
    ], function(err, results) {
        if (err) return next(err);
        res.json(results);
    });
});

/**
 * GET /aggregate_by_cat/:type/:fDate/:tDate
 * Route for getting aggregated outcome data of specific date range
 */
route.get('/aggregate_by_cat/:type/:fDate/:tDate', function(req, res, next) {
    const filter = getFilter(req.params);

    if (!filter) {
        return next(invalidParamsError());
    }

    Record.aggregate([
        { $match: filter },
        { $group: { _id: '$consumeDate', amount: { $sum: '$amount' } } }
    ], function(err, results) {
        if (err) return next(err);
        res.json(results);
    });
});

module.exports = route;