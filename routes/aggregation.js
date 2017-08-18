'use strict';

/*
 *
 * Routes for aggregation data
 *
 */
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const EnumRecordTypes = require('../consts/EnumRecordTypes');

/**
 * Get pipeline of filter
 * @param {String} recordType
 * @param {String} fDate
 * @param {String} tDate
 * @returns {{consumeDate: {$gte: Date, $lte: Date}, recordType: *}}
 */
function getFilter({ recordType, fDate, tDate }) {
    const fDateM = moment(fDate);
    const tDateM = moment(tDate);

    if (fDateM.isValid() && tDateM.isValid() && fDateM.isBefore(tDateM) && recordType) {
        return { consumeDate: { $gte: new Date(fDate), $lte: new Date(tDate) }, type: recordType };
    }
}

/**
 * Get pipeline of group
 * @param {String} groupId
 * @returns {{_id: string, sum: {$sum: string}}} @TODO: add operator or field as variables
 */
function getGroup({ groupId }) {
    if (groupId) {
        return {
            _id: '$' + groupId, amount: { $sum: '$amount' }
        };
    }
}

/**
 * GET /:recordType/:groupId/:fDate/:tDate
 * Route for getting aggregated amount of specific date range and groupId
 */
route.get('/:recordType/:groupId/:fDate/:tDate', function(req, res, next) {
    const filter = getFilter(req.params);
    const group = getGroup(req.params);

    if (!filter || !group) {
        return next(invalidParamsError());
    }

    Record.aggregate([
        { $match: filter },
        { $group: group },
        { $sort: { _id: 1 } }
    ], function(err, results) {
        if (err) return next(err);
        res.json(results);
    });
});

module.exports = route;