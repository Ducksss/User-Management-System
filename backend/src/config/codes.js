const httpCodeObj = {
    200: {
        code: 200,
        message: "Success",
        content: []
    },
    201: {
        code: 200,
        message: "Created",
        content: []
    },
    400: {
        code: 400,
        error: true,
        message: 'Bad Request',
        content: []
    },
    401: {
        code: 401,
        error: true,
        message: "Unauthorized",
        content: []
    },
    402: {
        code: 402,
        error: true,
        message: 'Payment Requireed',
        content: []
    },
    403: {
        code: 403,
        error: true,
        message: 'Forbidden',
        content: []
    },
    404: {
        code: 404,
        error: true,
        message: "Not Found",
        content: []
    },
    405: {
        code: 405,
        error: true,
        message: "Method Not Allowed",
        content: []
    },
    406: {
        code: 406,
        error: true,
        message: "Not Acceptable",
        content: []
    },
    409: {
        code: 409,
        error: true,
        message: "Conflict",
        content: []
    },
    500: {
        code: 500,
        error: true,
        message: 'Internal Server Error',
        content: []
    },
}

module.exports.codes = (statusCode, message, content) => {
    let httpCode = httpCodeObj[statusCode]

    if (message) httpCode.message = message
    
    if (content) httpCode.content = content
    
    return httpCode
}