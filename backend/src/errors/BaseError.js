const moment = require("moment");
 
class BaseError extends Error {
    constructor() {
        super();
        this.code = 400;
        this.error = true;
        this.name = "BaseErrors";
        this.message = "Errors";
        this.summary = "Errors";
    }
 
    toJSON() {
        return {
            code: this.code,
            error: true,
            message: this.message,
            name: this.name,
            summary: this.summary,
            content: [],
            datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
        }
    }
}
 
module.exports = { BaseError };