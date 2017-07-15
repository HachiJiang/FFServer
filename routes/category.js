'use strict';

/**
 * Create Router for two-level categories
 */

const _ = require('lodash');
const { invalidParamsError, notFoundError } = require('../utils/errorUtils');

const category = function(Model) {
    const express = require('express');
    const route = express.Router();

    route.param('catId', function(req, res, next, id) {
        Model.findById(id, function(err, doc) {
            if (err) return next(err);
            if (!doc) {
                return next(notFoundError());
            }
            req.cat = doc;
            return next();
        });
    });

    route.param('itemId', function(req, res, next, id) {
        req.item = req.cat.items.id(id);
        if (!req.item) {
            return next(notFoundError());
        }
        return next();
    });

    /**
     * GET /
     * Route for getting all categories
     */
    route.get('/', function(req, res) {
        Model.find({}).exec(function(err, accounts) {
            if (err) return next(err);
            res.json(accounts);
        });
    });

    /**
     * POST /
     * Route for creating a new category
     */
    route.post('/', function(req, res, next) {
        console.log(req);
        const { name, items } = req.body;
        if (!name) {
            return next(invalidParamsError());
        }

        const cat = {
            name,
            items: items || []
        };
        Model.create(cat, function(err, account) {
            if (err) return next(err);
            res.status(201);
            res.json(account);
        });
    });

    /**
     * POST /:catId/items
     * Route for creating a new item
     */
    route.post('/:catId/items', function(req, res, next) {
        let cat = req.cat;
        const newItem = req.body;

        if (!newItem || !newItem.name) {
            return next(invalidParamsError());
        }

        cat.items.push(newItem);
        cat.save(function(err, cat) {
            if (err) return next(err);
            res.status(201);
            res.json(cat);
        });
    });

    /**
     * PUT /:catId
     * Route for updating name of an existing category
     */
    route.put('/:catId', function(req, res, next) {
        const cat = req.cat;
        const { name } = req.body;

        if (!name) {
            return next(invalidParamsError());
        }

        cat.update({ name }, function(err, result) {
            if (err) return next(err);
            res.json(result);
        });
    });

    /**
     * PUT /:catId/items/:itemId
     * Route for updating name of an account item
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
     * Route for deleting an existing category
     */
    route.delete('/:catId', function(req, res) {
        console.log(req.params.catId);
        req.cat.remove(function(err, result) {
            if (err) return next(err);
            res.json(result);
        });
    });

    /**
     * DELETE /:catId/items/:itemId
     * Route for deleting an existing item
     */
    route.delete('/:catId/items/:itemId', function(req, res) {
        req.item.remove(function(err) {
            if (err) return next(err);
            req.cat.save(function(err, cat) {
                if (err) return next(err);
                res.json(cat);
            })
        });
    });

    return route;
};

module.exports = category;