const moment = require("moment");
 
class BaseError extends Error {
    constructor() {
        super();
        this.code = 400;
        this.error = true;
        this.name = "BaseErrors";
        this.description = "Errors";
        this.summary = "Errors";
    }
 
    toJSON() {
        return {
            code: this.code,
            error: true,
            description: this.message,
            name: this.name,
            summary: this.summary,
            content: [],
            datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
        }
    }
}
 
module.exports = { BaseError };