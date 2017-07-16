'use strict';

/**
 * Create Router for one-level item
 */
const { invalidParamsError, notFoundError } = require('../../utils/errorUtils');

const item = function(Model) {
    const express = require('express');
    const route = express.Router();

    route.param('itemId', function(req, res, next, id) {
        Model.findById(id, function(err, item) {
            if (err) return next(err);
            if (!item) return notFoundError();

            req.item = item;
            return next();
        })
    });

    /**
     * GET /
     * Route for getting all items
     */
    route.get('/', function(req, res, next) {
        Model.find({}).exec(function(err, items) {
            if (err) return next(err);
            res.json(items);
        })
    });

    /**
     * POST /
     * Route for creating a new item
     */
    route.post('/', function(req, res, next) {
        const name = req.body.name;

        if (!name) return next(invalidParamsError());

        Model.create({ name }, function(err, item) {
            if (err) return next(err);
            res.status(201);
            res.json(item);
        })
    });

    /**
     * PUT /:itemId
     * Route for updating an existing item
     */
    route.put('/:itemId', function(req, res) {
        const item = req.item;
        const name = req.body.name;

        if (!name) return next(invalidParamsError());

        item.update({ name }, function(err, result) {
            if (err) return next(err);
            res.json(result);
        });
    });

    /**
     * DELETE /:itemId
     * Route for deleting an existing item
     */
    route.delete('/:itemId', function(req, res) {
        req.item.remove(function(err, result) {
            if (err) return next(err);
            res.json(result);
        });
    });

    return route;
};

module.exports = item;