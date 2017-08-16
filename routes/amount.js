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

/**
 * GET /aggregate_by_day/outcome/from/:fDate/to/:tDate
 * Route for getting aggregated outcome data of specific date range
 */
route.get('/aggregate_by_day/outcome/from/:fDate/to/:tDate', function(req, res, next) {
    const fDate = moment(req.params.fDate, 'YYYY-MM-DD', true);
    const tDate = moment(req.params.tDate, 'YYYY-MM-DD', true);

    if (!fDate.isValid() || !tDate.isValid() || tDate.isBefore(fDate)) {
        return next(invalidParamsError());
    }

    Record.aggregate()
        .match({ consumeDate: { $gte: fDate, $lte: tDate }, type: EnumRecordTypes.OUTCOME })
        .exec(function(err, results) {
        if (err) return next(err);
        res.json(results);
    });
});

module.exports = route;