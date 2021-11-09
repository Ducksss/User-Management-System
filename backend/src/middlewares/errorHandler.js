const { codes } = require('../config/codes');
const { BaseError } = require('../errors/BaseError');
 
module.exports.errorHandler = (error, req, res, next) => {
    // check if there was already a response
    if (res.headersSent) return;
 
    // custom errors
    if (error instanceof BaseError) return res.status(error.code).send(error.toJSON());
    // other errors
    return res.status(500).send(codes(500, 'Internal Error', 'Please contact an administrator for help.')); // fallback
};