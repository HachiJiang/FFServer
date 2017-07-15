'use strict';

/**
 * Model for Project
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const ProjectSchema = require('./category');

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;