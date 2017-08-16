'use strict';

/**
 * Routes for records
 */
const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const Account = require('../models/account');
const Debtor = require('../models/debtor');
const { invalidParamsError, notFoundError } = require('../utils/errorUtils');
const { validateRecord } = require('../utils/recordUtils');
const accountUtils = require('../utils/accountUtils');
const debtorUtils = require('../utils/debtorUtils');

const PAGE_SLICE = 50;  // record number for each page

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
    Record.find({}).sort({ consumeDate: -1 }).limit(PAGE_SLICE).exec(function(err, records) {
        if (err) return next(err);
        res.json(records);
    });
});

/**
 * GET /:fDate/:tDate
 * Route for getting records of specific date range
 */
route.get('/:fDate/:tDate', function(req, res, next) {
    const fDate = moment(req.params.fDate);
    const tDate = moment(req.params.tDate);

    if (!fDate.isValid() || !tDate.isValid() || tDate.isBefore(fDate)) {
        return next(invalidParamsError());
    }

    Record.find({ consumeDate: { $gte: fDate, $lte: tDate } }, function(err, records) {
        if (err) return next(err);
        res.json(records);
    });
});

/**
 * Update account
 * @param {Object} newRecord
 * @param {Object} oldRecord
 */
function updateRelatedInfoByRecord(newRecord, oldRecord) {
    const commandsForAccount = accountUtils.getBalanceUpdateCommand(newRecord, oldRecord);
    if (commandsForAccount.length > 0) {
        Account.bulkWrite(commandsForAccount).then(function(r) {
            if (r.modifiedCount !== commandsForAccount.length) {
                console.error('Fail to update account balance!');
            }
        });
    }

    const commandsForDebtor = debtorUtils.getBalanceUpdateCommand(newRecord, oldRecord);
    if (commandsForDebtor.length > 0) {
        Debtor.bulkWrite(commandsForDebtor).then(function(r) {
            if (r.modifiedCount !== commandsForDebtor.length) {
                console.error('Fail to update debtor balance!');
            }
        });
    }
}

/**
 * POST /
 * Route for creating a new record
 */
route.post('/', function(req, res, next) {
    const record = validateRecord(req.body);

    Record.create(record, function(err, cat) {
        if (err) return next(err);
        res.status(201);
        res.json(cat);
        updateRelatedInfoByRecord(record);
    });
});

/**
 * PUT /records/:rid
 * Route for updating an existing record
 */
route.put('/:rid', function(req, res, next) {
    const newRecord = validateRecord(req.body);
    const oldRecord = _.cloneDeep(req.record.toObject()); // copy to avoid sync

    req.record.update(newRecord, function(err, result) {
        if (err) return next(err);
        res.json(result);
        updateRelatedInfoByRecord(newRecord, oldRecord);
    })
});

/**
 * DELETE /records/:rid
 * Route for deleting an existing record
 */
route.delete('/:rid', function(req, res, next) {
    req.record.remove(function(err, result) {
        if (err) return next(err);
        result.amount = -result.amount;
        res.json(result);
        updateRelatedInfoByRecord(result);
    });
});

module.exports = route;