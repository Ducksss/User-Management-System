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

class MissingError extends ParamError {
    constructor(param){
        super();
        this.name = "Missing Param Error"
        this.message = `The param "${param}" is missing.`
    }
}

module.exports = { ParamError, DuplicateError, MissingError }