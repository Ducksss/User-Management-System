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
 
module.exports = { AuthError, StatusError, InvalidCredentialsError }
 
// Not Acceptable
// Failed to verify
// Forbidden
// Session Expired - done
// Unathorised, token dont exist - done
// No token is detected - done
 
// Insertion of OTP has failed (system passaway not user prob lmao)
// Unable to complete update (users) operation
// Forbidden, Your token has expired. Please try again
// Forbidden, It has already been done
// Request Timeout
// Forbidden, TokenExpiredError
// Bad Request
