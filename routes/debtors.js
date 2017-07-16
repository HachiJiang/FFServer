'use strict';

/**
 * Routes for debtors
 */
const express = require('express');
const route = express.Router();
const item = require('./factory/item');

const Debtor = require('../models/debtor');

module.exports = item(Debtor);