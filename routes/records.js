const express = require('express');
const route = express.Router();

/**
 * Get records of current month
 */
route.get('/', (req, res) => {
    res.send('records');
});

module.exports = route;