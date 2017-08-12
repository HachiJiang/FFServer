'use strict';

/*
 *
 * Validate info of accounts
 * 对账
 *
 */
const _ = require('lodash');
const Record = require('../models/record');
const Account = require('../models/account');
const { ID_SEPARATOR } = require('../consts/Config');
const { getSingleItemUpdateCommand } = require('../utils/categoryUtils');

const addCalculatedItem = (accounts, account, amount) => {
    if (!account || !amount) return;

    const balance = _.toNumber(accounts[account] || 0);
    accounts[account] = (balance + _.toNumber(amount)).toFixed(2);
};

const calculateBalance = records => {
    let accounts = {};

    _.forEach(records, record => {
        if (!record) return;

        const { amount } = record;

        addCalculatedItem(accounts, record.accountFrom, -amount);
        addCalculatedItem(accounts, record.accountTo, amount);
    });

    return accounts;
};

const getSavedAccounts = accounts => {
    let savedAccounts = {};

    _.forEach(accounts, cat => {
        if (!cat) return;

        const catId = cat._id;
        _.forEach(cat.items, item => {
            if (!item) return;
            savedAccounts[[catId, item._id].join(ID_SEPARATOR)] = {
                catName: cat.name,
                itemName: item.name,
                balance: _.toNumber(item.balance || 0).toFixed(2)
            };
        });
    });

    return savedAccounts;
};

const checkBalance = () => {
    let calculated = {};
    let saved = {};

    Record.find({}).exec(function(err, records) {
        if (err) console.error(err);

        calculated = calculateBalance(records);

        //console.log('Account Calculated: ');
        //console.log(calculated);
    })
    .then(function() {
            Account.find({}).exec(function(err, accounts) {
                if (err) console.error(err);

                let commands = [];
                saved = getSavedAccounts(accounts);

                //console.log('Account Saved: ');
                //console.log(saved);

                // compare results
                _.forIn(saved, (account, key) => {
                    const calculatedBalance = calculated[key];

                    if (calculated[key] && calculated[key] !== account.balance) {
                        console.error('Mismatched: ');
                        console.error(key, ' ', account.catName, ', ', account.itemName, ' ', 'Calculated: ' + calculated[key], ' ', 'Saved: ' + saved[key].balance);

                        // @TODO: update account, use bulkWrite
                        commands.push(getSingleItemUpdateCommand(key, { "$set": { "items.$.balance": calculatedBalance } }));
                    }
                });

                if (commands.length > 0) {
                    Account.bulkWrite(commands).then(function(r) {
                        if (r.modifiedCount !== commands.length) {
                            console.error('Update account failed! Please try again...');
                        } else {
                            console.log('Update account successfully!');
                        }
                    })
                } else {
                    console.log('Congratulations! No Account mismatches!');
                }
            });
        });
};

module.exports = {
    checkBalance
};