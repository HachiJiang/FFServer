'use strict';

/*
 *
 * Routes for aggregation data
 *
 */
const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const EnumRecordTypes = require('../consts/EnumRecordTypes');

const GROUP_SEPARATOR = '-';

/**
 * Get pipeline of filter
 * @param {String} recordType
 * @param {String} fDate
 * @param {String} tDate
 * @returns {{consumeDate: {$gte: Date, $lte: Date}, recordType: *}}
 */
function getFilter({ recordType, fDate, tDate }) {
    if (!fDate && !tDate) {
        return { type: recordType };
    }

    const fDateM = moment(fDate);
    const tDateM = moment(tDate);

    if (fDateM.isValid() && tDateM.isValid() && fDateM.isBefore(tDateM) && recordType) {
        return { consumeDate: { $gte: new Date(fDate), $lte: new Date(tDate) }, type: recordType };
    }
}

/**
 * Get pipeline of group
 * @param {number} timeZoneOffset
 * @param {String} sumBy
 * @param {String} groupId
 * @returns {{_id: string, sum: {$sum: string}}} @TODO: add operator or field as variables
 */
function getGroup({ timeZoneOffset = 0, sumBy = '', groupId = '' }) {
    let groups = {};
    if (groupId) {
        const ids = groupId.split(GROUP_SEPARATOR);
        const datePipeline = [{ $subtract: ['$consumeDate', timeZoneOffset * 60 * 1000] } ];

        _.forEach(ids, id => {
            switch(id) {
                case 'year':
                    groups[id] = { $year: datePipeline };  // date could only be consumeDate
                    break;
                case 'month':
                    groups[id] = { $month: datePipeline };
                    break;
                case 'day':
                    groups[id] = { $dayOfMonth: datePipeline };
                    break;
                default:
                    groups[id] = '$' + id;
                    break;
            }
        });
    } else {
        groups = null;
    }

    return {
        _id: groups,
        value: { $sum: '$' + sumBy }  // use common prop name
    };
}

const routeHandler = (req, res, next) => {
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
};

/**
 * GET /:timeZoneOffset/:sumBy/:recordType
 * Route for getting aggregated amount of specific date range and groupId
 */
route.get('/:timeZoneOffset/:sumBy/:recordType', routeHandler);

/**
 * GET /:timeZoneOffset/:sumBy/:recordType/:groupId
 * Route for getting aggregated amount of specific date range and groupId
 */
route.get('/:timeZoneOffset/:sumBy/:recordType/:groupId', routeHandler);

/**
 * GET /:timeZoneOffset/:sumBy/:recordType/:groupId/:fDate/:tDate
 * Route for getting aggregated amount of specific date range and groupId
 */
route.get('/:timeZoneOffset/:sumBy/:recordType/:groupId/:fDate/:tDate', routeHandler);

module.exports = route;