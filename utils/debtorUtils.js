'use strict';

const { getSingleItemUpdateCommand } = require('./itemUtils');

/**
 * Get commands to update balance of all related debtors
 * @param {Object} record
 * @param {Object} oldRecord: old version, for updating only
 * @returns {Array}
 */
function getBalanceUpdateCommand(record, oldRecord = {}) {
    const { accountFrom, accountTo, debtor, amount } = record;
    const oldAccountFrom = oldRecord.accountFrom;
    const oldAccountTo = oldRecord.accountTo;
    const oldDebtor = oldRecord.debtor;
    const oldAmount = oldRecord.amount;

    let commands = [];

    // if account is updated
    if (oldDebtor) {
        if (oldAccountFrom) {
            commands.push(getSingleItemUpdateCommand(oldDebtor, { "$inc": { "balance": -oldAmount } }));
        }
        if (oldAccountTo) {
            commands.push(getSingleItemUpdateCommand(oldDebtor, { "$inc": { "balance": oldAmount } }));
        }
    }

    if (debtor) {
        if (accountFrom) {
            commands.push(getSingleItemUpdateCommand(debtor, { "$inc": { "balance": amount } }));
        }

        if (accountTo) {
            commands.push(getSingleItemUpdateCommand(debtor, { "$inc": { "balance": -amount } }));
        }
    }

    console.log(JSON.stringify(commands));
    return commands;
}

module.exports = {
    getBalanceUpdateCommand
};