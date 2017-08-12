'use strict';

const { getSingleItemUpdateCommand } = require('./categoryUtils');

/**
 * Get commands to update all related accounts
 * 账户余额的支点在于 AccountFrom, AccountTo
 * @param {Object} record
 * @param {Object} oldRecord: old version, for updating only
 * @returns {Array}
 */
function getBalanceUpdateCommand(record, oldRecord = {}) {
    const { accountFrom, accountTo, amount } = record;
    const oldAccountFrom = oldRecord.accountFrom;
    const oldAccountTo = oldRecord.accountTo;
    const oldAmount = oldRecord.amount;

    let commands = [];

    // if account is updated
    if (oldAccountFrom) {
        commands.push(getSingleItemUpdateCommand(oldAccountFrom, { "$inc": { "items.$.balance": oldAmount } }));
    }
    if (oldAccountTo) {
        commands.push(getSingleItemUpdateCommand(oldAccountTo, { "$inc": { "items.$.balance": -oldAmount } }));
    }

    if (accountFrom) {
        commands.push(getSingleItemUpdateCommand(accountFrom, { "$inc": { "items.$.balance": -amount } }));
    }

    if (accountTo) {
        commands.push(getSingleItemUpdateCommand(accountTo, { "$inc": { "items.$.balance": amount } }));
    }
    return commands;
}

module.exports = {
    getBalanceUpdateCommand
};