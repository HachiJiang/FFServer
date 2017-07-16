'use strict';

/**
 * Model for Project
 */
const mongoose = require('mongoose');
const ProjectSchema = require('./base/categorySchema');

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;