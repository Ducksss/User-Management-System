// imports
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/config');
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const nodeMailer = require('nodemailer');
const validators = require('../middlewares/validators');
// const moment = require("moment");
const cookieParser = require('cookie-parser');

// Importing service's layer
const loginService = require('../services/loginService');
const manageUsers = require('../services/manageUserService');
const resettingPasswordService = require('../services/resettingPasswordService')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
        name: "stripe-samples/subscription-use-cases/fixed-price",
        version: "0.0.1",
        url: "https://github.com/stripe-samples/subscription-use-cases/fixed-price"
    }
});

// Status codes
const { codes } = require('../config/codes');
const e = require('express');
class ErrorHandler {
    constructor(message) {
        this.name;
        this.message = message;
    }
}
exports.loginControllerErrorHandler = 
class loginControllerErrorHandler extends ErrorHandler {
    constructor(codeNumber, message) {
        super(message);
        this.message = codes(codeNumber).message;
        this.code = codes(codeNumber).code;
        this.error = codes(codeNumber).error;
        this.content = codes(codeNumber).content;
        this.datetime = codes(codeNumber).datetime;
    }

    internalError = () => {
        var result = 
        `Message: ${this.message}\nCode: ${this.code}\nDate & Time: ${this.datetime}`;
        return result;
    }

    invalidCredentials = () => {
        throw new loginController("Invalid Credentials")
    }

    bannedUser = () => {
        throw new loginController("Banned User")
    }

    lockedAccount = () => {
        throw new loginController("Locked Account")
    }
}

class manageUserController extends Error {
    constructor(message) {
   }
}

class resettingPasswordController extends Error {
    constructor(message) {
   }
}

class subscriptionController extends Error {
    constructor(message) {
   }
}
