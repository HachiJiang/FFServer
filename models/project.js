'use strict';

/**
 * Model for Project
 */
const mongoose = require('mongoose');
const ProjectSchema = require('./factory/categorySchemaCreator')();

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;