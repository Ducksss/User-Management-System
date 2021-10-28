const { codes } = require('../config/codes');

class ErrorHandler {
    constructor(message) {
        this.name;
        this.message = message;
        this.stack;
    }
}

module.exports.middleware = async (req, res, next) => {
    try {
        console.log("test")
    }
    
    catch (error) {
        next(error);
    }
}

exports.errorHandlerMiddleware = 

class errorHandlerMiddleware extends ErrorHandler {
    constructor(codeNumber, message) {
        super();
        this.message = codes(codeNumber).message;
        this.code = codes(codeNumber).code;
        this.error = codes(codeNumber).error;
        this.content = codes(codeNumber).content;
        this.datetime = codes(codeNumber).datetime;
    }

    printError = () => {
        var result = 
        `Message: ${this.message}\nCode: ${this.code}\nDate & Time: ${this.datetime}`;
        return result;
    }

    middlewareFn = async(req, res, next) => {
        try{
            console.log("test1");
        }

        catch{
            console.log("test2");
        }
    }
    
}

