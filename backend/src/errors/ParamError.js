const { BaseError } = require('./BaseError');

class ParamError extends BaseError {
    constructor(){
        super();
        this.name = "Param Error";
        this.description = "Param Error"
        this.summary = "Param Error"
        this.code = 409;
    }
}

class DuplicateError extends ParamError {
    constructor(param){
        super();
        this.name = "Duplicate Error";
        this.description = `The ${param} has already been taken.`
    }
}

class RepeatedPasswordError extends ParamError {
    constructor(){
        super();
        this.name = "Repeated Password Error"
        this.description = "You cannot use your last 3 password."
    }
}

class MissingError extends ParamError {
    constructor(param){
        super();
        this.name = "Missing Param Error";
        this.description = `The param "${param}" is missing.`;
    }
}

class ValidationError extends ParamError {
    constructor(){
        super();
        this.name = "Validation Error";
        this.description = "There is an error with validation.";
        this.summary = "Not Acceptable."
        this.code = 406
    }
}

class InvalidInputError extends ParamError {
    constructor(){
        super();
        this.name = "Invalid Input Error";
        this.description = "Input is not valid."
    }
}

module.exports = { ParamError, DuplicateError, RepeatedPasswordError, MissingError, ValidationError, InvalidInputError }