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

const loadRoutes = function(app) {
    app.use('/records', recordRoutes);
    app.use('/income', incomeRoutes);
    app.use('/outcome', outcomeRoutes);
    app.use('/accounts', accountRoutes);
    app.use('/projects', projectRoutes);
    app.use('/members', memberRoutes);
    app.use('/debtors', debtorRoutes);
};

module.exports = loadRoutes;