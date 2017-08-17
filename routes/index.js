'use strict';

/**
 * Use Routes
 */
const recordRoutes = require('./records');
const incomeRoutes = require('./income');
const outcomeRoutes = require('./outcome');
const accountRoutes = require('./accounts');
const projectRoutes = require('./projects');
const memberRoutes = require('./members');
const debtorRoutes = require('./debtors');
const aggregationRoutes = require('./aggregation');

const VERSION = '/api/v1';

const loadRoutes = function(app) {
    app.use(`${VERSION}/records`, recordRoutes);
    app.use(`${VERSION}/income`, incomeRoutes);
    app.use(`${VERSION}/outcome`, outcomeRoutes);
    app.use(`${VERSION}/accounts`, accountRoutes);
    app.use(`${VERSION}/projects`, projectRoutes);
    app.use(`${VERSION}/members`, memberRoutes);
    app.use(`${VERSION}/debtors`, debtorRoutes);
    app.use(`${VERSION}/aggregation`, aggregationRoutes);
};

module.exports = loadRoutes;