'use strict';

/**
 * Routes for account types
 */
const _ = require('lodash');
const express = require('express');
const route = express.Router();
const Account = require('../models/Account');
const { invalidParamsError, notFoundError } = require('../utils/errorUtils');

route.param('catId', function(req, res, next, id) {
    Account.findById(id, function(err, doc) {
        if (err) return next(err);
        if (!doc) {
            return next(notFoundError());
        }
        req.accountCat = doc;
        return next();
    });
});

route.param('itemId', function(req, res, next, id) {
    req.item = req.accountCat.items.id(id);
    if (!req.item) {
        return next(notFoundError());
    }
    return next();
});

/**
 * GET /
 * Route for getting all account types
 */
route.get('/', function(req, res) {
    Account.find({}).exec(function(err, accounts) {
        if (err) return next(err);
        res.json(accounts);
    });
});

/**
 * POST /
 * Route for creating a new account category
 */
route.post('/', function(req, res, next) {
    const { name, items } = req.body;
    if (!name) {
        return next(invalidParamsError());
    }

    const accountCat = {
        name,
        items: items || []
    };
    Account.create(accountCat, function(err, account) {
        if (err) return next(err);
        res.status(201);
        res.json(account);
    });
});

/**
 * POST /:catId/items
 * Route for creating a new account item
 */
route.post('/:catId/items', function(req, res, next) {
    let accountCat = req.accountCat;
    const newItem = req.body;

    if (!newItem || !newItem.name) {
        return next(invalidParamsError());
    }

    accountCat.items.push(newItem);
    accountCat.save(function(err, cat) {
        if (err) return next(err);
        res.status(201);
        res.json(cat);
    });
});

/**
 * PUT /:catId
 * Route for updating name of an existing account category
 */
route.put('/:catId', function(req, res, next) {
    const accountCat = req.accountCat;
    const { name } = req.body;

    if (!name) {
        return next(invalidParamsError());
    }

    accountCat.update({ name }, function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

/**
 * PUT /:catId/items/:itemId
 * Route for updating name of an existing account item
 */
route.put('/:catId/items/:itemId', function(req, res, next) {
    const item = req.item;
    const { name } = req.body;

    if (!name) {
        return next(invalidParamsError());
    }

    item.update({ name }, function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

/**
 * DELETE /:catId
 * Route for deleting an existing account category
 */
route.delete('/:catId', function(req, res) {
    req.accountCat.remove(function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

/**
 * DELETE /:catId/items/:itemId
 * Route for deleting an existing account item
 */
route.delete('/:catId/items/:itemId', function(req, res) {
    req.item.remove(function(err) {
        if (err) return next(err);
        req.accountCat.save(function(err, cat) {
            if (err) return next(err);
            res.json(cat);
        })
    });
});

module.exports = route;