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

class ExpiredTokenError extends TokenError {
    constructor(){
        super();
        this.name = "Expired Token Error";
        this.message = "Your token has expired.";
    }
}

class InvalidTokenError extends TokenError {
    constructor(){
        super();
        this.name = "Invalid Token Error";
        this.message = "The token is invalid."
    }
}

class NoTokenError extends TokenError {
    constructor(){
        super();
        this.name = "No Token Error";
        this.message = "There is no token detected.";
    }
}

module.exports = { TokenError, ExpiredTokenError, InvalidTokenError, NoTokenError }