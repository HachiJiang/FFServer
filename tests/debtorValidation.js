'use strict';

/*
 *
 * Validate info of debtors
 * 对账
 *
 */
const _ = require('lodash');
const Record = require('../models/record');
const Debtor = require('../models/debtor');
const { getSingleItemUpdateCommand } = require('../utils/itemUtils');

const addCalculatedItem = (calculated, debtor, amount) => {
    if (!amount) return;

    const balance = _.toNumber(calculated[debtor] || 0);
    calculated[debtor] = (balance + _.toNumber(amount)).toFixed(2);
};

const calculateBalance = records => {
    let calculated = {};

    _.forEach(records, (record = {}) => {
        const { accountFrom, accountTo, amount, debtor } = record;

        if (!debtor) {
            return;
        }

        if (accountFrom) {
            addCalculatedItem(calculated, debtor, -amount);
        }

        if (accountTo) {
            addCalculatedItem(calculated, debtor, amount);
        }
    });

    return calculated;
};

const getSavedItems = items => {
    let saved = {};

    _.forEach(items, item => {
        if (!item) return;

        saved[item._id] = {
            name: item.name,
            balance: _.toNumber(item.balance || 0).toFixed(2)
        };
    });

    return saved;
};

const checkBalance = () => {
    let calculated = {};
    let saved = {};

    Record.find({}).exec(function(err, records) {
        if (err) console.error(err);

        calculated = calculateBalance(records);

        //console.log('Debtors Calculated: ');
        //console.log(calculated);
    })
        .then(function() {
            Debtor.find({}).exec(function(err, debtors) {
                if (err) console.error(err);

                let commands = [];
                saved = getSavedItems(debtors);

                //console.log('Debtors Saved: ');
                //console.log(saved);
                // compare results
                _.forIn(saved, (debtor, key) => {
                    const calculatedBalance = calculated[key];

                    if (calculatedBalance && calculatedBalance !== debtor.balance) {
                        console.error('Mismatched: ');
                        console.error(key, ' ', debtor.name, ', ', 'Calculated: ' + calculatedBalance, ' ', 'Saved: ' + saved[key].balance);

                        commands.push(getSingleItemUpdateCommand(key, { "$set": { "balance": calculatedBalance } }));
                    }
                });

                if (commands.length > 0) {
                    Debtor.bulkWrite(commands).then(function(r) {
                        if (r.modifiedCount !== commands.length) {
                            console.error('Update debtor failed! Please try again...');
                        } else {
                            console.log('Update debtor successfully!');
                        }
                    })
                } else {
                    console.log('Congratulations! No Debtor mismatches!');
                }
            });
        });
};

module.exports = {
    checkBalance
};