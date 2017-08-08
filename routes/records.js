'use strict';

/**
 * Routes for records
 */
const moment = require('moment');
const express = require('express');
const route = express.Router();

const Record = require('../models/record');
const Account = require('../models/account');
const { invalidParamsError, notFoundError } = require('../utils/errorUtils');
const { validateRecord } = require('../utils/recordUtils');
const { ID_SEPARATOR } = require('../consts/Config');

const PAGE_SLICE = 50;  // record number for each page

route.param('rid', function(req, res, next, id) {
    // @TODO: get category/account/project/member/debtor

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
 * Update account balance
 * @param {string} accountStr
 * @param {number} amount
 * @returns {Object}
 */
function getAccountUpdateCommand(accountStr, amount) {
    if (!accountStr) return;

    const ids = accountStr.split(ID_SEPARATOR);
    const catId = ids[0];
    const itemId = ids[1];

    if (!catId || !itemId) return;

    console.log(ids);

    return {
        updateOne: {
            filter: {
                _id: catId,
                "items._id": itemId
            },
            update: { "$inc": { "items.$.balance": amount } }
        }
    };
}

/**
 * Update account
 * @param res
 * @param next
 * @param result: sent to client
 * @param next
 * @param {Object} record
 * @param {Object} oldRecord: old version, for updating only
 */
function updateAccountByRecord(res, next, result, record, oldRecord) {
    const { accountFrom, accountTo, amount } = record;
    let commands = [];

    // if account is updated
    if (oldRecord) {
        const oldAccountFrom = oldRecord.accountFrom;
        const oldAccountTo = oldRecord.accountTo;

        if (oldAccountFrom !== accountFrom) commands.push(getAccountUpdateCommand(oldAccountFrom, amount));
        if (oldAccountTo !== accountTo) commands.push(getAccountUpdateCommand(oldAccountTo, -amount));
    }

    const commandForFrom = getAccountUpdateCommand(accountFrom, -amount);
    if (commandForFrom) commands.push(commandForFrom);

    const commandForTo = getAccountUpdateCommand(accountTo, amount);
    if (commandForTo) commands.push(commandForTo);

    console.log(commands);

    Account.bulkWrite(commands).then(function(r) {
        console.log(r.modifiedCount);
        if (r.modifiedCount !== commands.length) return next(err);
        res.json(result);
    });
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
        updateAccountByRecord(res, next, cat, record);
    });
});

/**
 * PUT /records/:rid
 * Route for updating an existing record
 */
route.put('/:rid', function(req, res, next) {
    const record = validateRecord(req.body);
    const oldRecord = req.record;

    oldRecord.update(record, function(err, result) {
        if (err) return next(err);
        updateAccountByRecord(res, next, result, record, oldRecord);
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
        updateAccountByRecord(res, next, result, result);
    });
});

module.exports = route;