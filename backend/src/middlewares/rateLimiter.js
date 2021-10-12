const rateLimit = require("express-rate-limit");

module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    statusCode: 429,
    message: {
        status: 429,
        error: "Too many login attempts from this IP, please try again in 15 minutes"
    }
});

module.exports.registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 5,
    statusCode: 429,
    message: {
        status: 429,
        error: "Too many accounts created from this IP, please try again in an hour"
    }
});

