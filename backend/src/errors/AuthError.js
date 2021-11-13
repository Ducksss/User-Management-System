const { BaseError } = require('./BaseError');
 
class AuthError extends BaseError {
    constructor(){
        super();
        this.name = "Authentication Error";
        this.message = "Authentication Error";
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
                this.message = 'Please check your email. You need to verify your account.';
                break;
            case 'Banned':
                this.message = 'Your account has been banned. Please contact an administrator.';
                break;
            case 'Locked out':
                this.message = 'Your account has been locked. Please reset your password before proceeding.';
                break;
            default:
                this.message = 'Please contact an administrator for help.';
        }
    }
}
 
class InvalidCredentialsError extends AuthError {
    constructor(){
        super();
        this.name = "Invalid Credentials Error";
        this.message = 'Your email or password is invalid.';
    }
}

class VerificationError extends AuthError {
    constructor(){
        super();
        this.name = "Verification Error";
        this.message = "Failed to verify.";
    }
}
 
module.exports = { AuthError, StatusError, InvalidCredentialsError, VerificationError }