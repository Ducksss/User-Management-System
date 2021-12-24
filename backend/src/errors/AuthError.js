const { BaseError } = require('./BaseError');
 
class AuthError extends BaseError {
    constructor(){
        super();
        this.name = "Authentication Error";
        this.description = "Authentication Error";
        this.summary = "Authentication Error";
        this.code = 401;
    }
}

class StatusError extends AuthError {
    constructor(status){
        super();
        this.name = "Status Error";
        this.summary = status;
        switch(status) {
            case 'Unverified':
                this.description = 'Please check your email. You need to verify your account.';
                break;
            case 'Banned':
                this.description = 'Your account has been banned. Please contact an administrator.';
                break;
            case 'Locked out':
                this.description = 'Your account has been locked. Please reset your password before proceeding.';
                break;
            default:
                this.description = 'Please contact an administrator for help.';
        }
    }
}
 
class InvalidCredentialsError extends AuthError {
    constructor(){
        super();
        this.name = "Invalid Credentials Error";
        this.description = 'Your email or password is invalid.';
    }
}

class VerificationError extends AuthError {
    constructor(){
        super();
        this.name = "Verification Error";
        this.description = "Failed to verify.";
    }
}

module.exports = { AuthError, StatusError, InvalidCredentialsError, VerificationError }