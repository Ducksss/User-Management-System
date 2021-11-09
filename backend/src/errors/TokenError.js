const { BaseError } = require('./BaseError');

class TokenError extends BaseError {
    constructor(){
    super();
    this.name = "Refresh Token Error";
    this.message = "Refresh Token Error";
    this.summary = "Refresh Token Error";
    this.code = 401
    }
}

class ExpiredSessionError extends TokenError {
    constructor(){
        super();
        this.name = "Expired Session Error";
        this.message = "Your session has expired.";
    }
}

class NoTokenError extends TokenError {
    constructor(){
        super();
        this.name = "No Token Error";
        this.message = "There is no token detected.";
    }
}

module.exports = { TokenError, ExpiredSessionError }