'use strict';

const _ = require('lodash');
const EnumRecordType = require('../consts/EnumRecordTypes');

/**
 * Get property keys by record type
 * @param {String} type
 * @returns {Object}
 */
const getPropKeysByType = type => {
    const keys = ['type', 'amount', 'project', 'tips', 'consumeDate', 'member', 'location', 'createdAt', 'updatedAt'];
    switch(type) {
        case EnumRecordType.OUTCOME:
        default:
            return keys.concat(['category', 'accountFrom']);
        case EnumRecordType.INCOME:
            return keys.concat(['category', 'accountFrom']);
        case EnumRecordType.TRANSFER:
            return keys.concat(['debtor', 'accountFrom', 'accountTo']);
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            return keys.concat(['debtor', 'accountTo', 'project']);
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return keys.concat(['debtor', 'accountFrom', 'project']);
    }
};

/**
 * Validate record and return with necessary props only
 * Avoid redundant info
 * @param {Object} record
 * @returns {{}}
 */
const validateRecord = record => {
    if (!record) return;

    let validRecord = {};
    _.forEach(getPropKeysByType(record.type), key => {
        validRecord[key] = record[key];
    });
    return validRecord;
};

module.exports = {
    validateRecord
};