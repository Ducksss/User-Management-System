const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(), format.json()
            )
        })
    ]
});

module.exports.errorLogger = (err, req, res, next) => {
    logger.error(err);
    next(err);
}