const moment = require("moment");

const httpCodeObj = {
    200: {
        code: 200,
        description: "Success",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    201: {
        code: 200,
        description: "Created",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    400: {
        code: 400,
        error: true,
        description: 'Bad Request',
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    401: {
        code: 401,
        error: true,
        description: "Unauthorized",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    402: {
        code: 402,
        error: true,
        description: 'Payment Requireed',
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    403: {
        code: 403,
        error: true,
        description: 'Forbidden',
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    404: {
        code: 404,
        error: true,
        description: "Not Found",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    405: {
        code: 405,
        error: true,
        description: "Method Not Allowed",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    406: {
        code: 406,
        error: true,
        description: "Not Acceptable",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    409: {
        code: 409,
        error: true,
        description: "Conflict",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    429: {
        code: 429,
        error: true,
        description: "Too Many Requests response status",
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
    500: {
        code: 500,
        error: true,
        description: 'Internal Server Error',
        content: [],
        datetime: moment().utc().format('MMMM Do YYYY, h:mm:ss a')
    },
};


module.exports.codes = (statusCode, message, content, datetime) => {
    let httpCode = httpCodeObj[statusCode]

    if (message) httpCode.message = message
    
    if (content) httpCode.content = content

    if (datetime) httpCode.datetime = datetime
    
    return httpCode
}