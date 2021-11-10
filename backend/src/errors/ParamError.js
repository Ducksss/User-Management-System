const { BaseError } = require('./BaseError');

class ParamError extends BaseError {
    constructor(){
        super();
        this.name = "Param Error";
        this.message = "Param Error"
        this.summary = "Param Error"
        this.code = 409;
    }
}

class DuplicateError extends ParamError {
    constructor(param){
        super();
        this.name = "Duplicate Error";
        this.message = `The ${param} has already been taken.`
    }
}

class RepeatedPasswordError extends ParamError {
    constructor(){
        super();
        this.name = "Repeated Password Error"
        this.message = "You cannot use your last 3 password."
    }
}

class MissingError extends ParamError {
    constructor(param){
        super();
        this.name = "Missing Param Error";
        this.message = `The param "${param}" is missing.`;
    }
}

class ValidationError extends ParamError {
    constructor(){
        super();
        this.name = "Validation Error";
        this.message = "There is an error with validation.";
        this.summary = "Not Acceptable."
        this.code = 406
    }
}

module.exports = { ParamError, DuplicateError, RepeatedPasswordError, MissingError, ValidationError }