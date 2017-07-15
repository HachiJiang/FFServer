/**
 * ProjectSchema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    parent: {
        type: String,
        trim: true
    }
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;