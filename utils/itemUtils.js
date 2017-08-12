'use strict';

/**
 * Update balance of single item
 * @param {string} _id
 * @param {Object} updateCommand
 * @returns {Object}
 */
function getSingleItemUpdateCommand(_id, updateCommand) {
    if (!_id) return;

    return {
        updateOne: {
            filter: {
                _id: _id
            },
            update: updateCommand
        }
    };
}

module.exports = {
    getSingleItemUpdateCommand
};