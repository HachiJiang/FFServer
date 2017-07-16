'use strict';

/**
 * Model for Member
 */
const mongoose = require('mongoose');
const MemberSchema = require('./base/itemSchema');

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;