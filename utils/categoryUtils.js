'use strict';

const { ID_SEPARATOR } = require('../consts/Config');

/**
 * Update balance of single item
 * @param {string} idStr
 * @param {Object} updateCommand
 * @returns {Object}
 */
function getSingleItemUpdateCommand(idStr, updateCommand) {
    if (!idStr) return;

    const ids = idStr.split(ID_SEPARATOR);
    const catId = ids[0];
    const itemId = ids[1];

    if (!catId || !itemId) return;

    return {
        updateOne: {
            filter: {
                _id: catId,
                "items._id": itemId
            },
            update: updateCommand
        }
    };
}

module.exports = {
    getSingleItemUpdateCommand
};