'use strict';

/**
 * Model for Member
 */
const mongoose = require('mongoose');
const MemberSchema = require('./factory/itemSchemaCreator')();

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;