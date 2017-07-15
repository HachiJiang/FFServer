'use strict';

/**
 * Create Error
 * @param {String} message
 * @param {String} status
 * @returns {Error}
 */
const createError = (message, status) => {
    var err = new Error(message);
    err.status = status;
    return err;
};

/**
 * Create Error for invalid params
 * @returns {Error}
 */
const invalidParamsError = () => {
    return createError('Invalid params!', 401);
};

/**
 * Create Error for Not Found
 * @returns {Error}
 */
const notFoundError = () => {
    return createError('Not Found!', 404);
};

module.exports = {
    createError,
    invalidParamsError,
    notFoundError
};