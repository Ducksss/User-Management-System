const moment = require("moment");

const httpCodeObj = {
    200: {
        code: 200,
        message: "Success",
        error: false,
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    201: {
        code: 200,
        message: "Created",
        error: false,
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    204: {
        code: 204,
        message: "No Content",
        error: false,
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    400: {
        code: 400,
        error: true,
        message: 'Bad Request',
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    401: {
        code: 401,
        error: true,
        message: "Unauthorized",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    402: {
        code: 402,
        error: true,
        message: 'Payment Required',
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    403: {
        code: 403,
        error: true,
        message: 'Forbidden',
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    404: {
        code: 404,
        error: true,
        message: "Not Found",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    405: {
        code: 405,
        error: true,
        message: "Method Not Allowed",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    406: {
        code: 406,
        error: true,
        message: "Not Acceptable",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    408: {
        code: 408,
        error: true,
        message: "Request Timeout",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    409: {
        code: 409,
        error: true,
        message: "Conflict",
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    500: {
        code: 500,
        error: true,
        message: 'Internal Server Error',
        content: [],
        datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
}

module.exports.codes = (statusCode, message, content) => {
    let httpCode = httpCodeObj[statusCode]

    if (message) httpCode.message = message
    
    if (content) httpCode.content = content
    
    return httpCode
}