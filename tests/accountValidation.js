'use strict';

/*
 *
 * Validate balance of accounts
 *
 */
const _ = require('lodash');
const Record = require('../models/record');
const Account = require('../models/account');
const { ID_SEPARATOR } = require('../consts/Config');

const updateAccount = (accounts, account, amount) => {
    if (!account || !amount) return;

    const balance = _.toNumber(accounts[account] || 0);
    accounts[account] = (balance + _.toNumber(amount)).toFixed(2);
};

const calculateBalance = records => {
    let accounts = {};

    _.forEach(records, record => {
        if (!record) return;

        const { amount } = record;

        updateAccount(accounts, record.accountFrom, -amount);
        updateAccount(accounts, record.accountTo, amount);
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

        console.log('Calculated: ');
        console.log(calculated);
    })
    .then(function() {
            Account.find({}).exec(function(err, accounts) {
                if (err) console.error(err);

                saved = getSavedAccounts(accounts);

                console.log('Saved: ');
                console.log(saved);

                // compare results
                _.forIn(saved, (account, key) => {
                    if (calculated[key] && calculated[key] !== account.balance) {
                        console.error('Mismatched: ');
                        console.error(account.catName, ', ', account.itemName, ' ', 'Calculated: ' + calculated[key], ' ', 'Saved: ' + saved[key].balance);
                    }
                });
            });
        });
};

module.exports = {
    checkBalance
};