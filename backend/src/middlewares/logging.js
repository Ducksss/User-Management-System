const winston = require('winston');
// const { BaseError } = require('../errors/BaseError');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

module.exports.logging = (error, req, res, next) => {
    console.log(error)
    const message = error instanceof Error ? error.message : error
    logger.error(message);
    next(error);
};
