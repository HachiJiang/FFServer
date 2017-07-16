'use strict';

/**
 * Routes for members
 */
const express = require('express');
const route = express.Router();
const item = require('./factory/item');

const Member = require('../models/member');

module.exports = item(Member);