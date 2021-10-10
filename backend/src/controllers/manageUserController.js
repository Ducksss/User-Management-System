// imports
const qrcode = require('qrcode');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');
const nodeMailer = require('nodemailer');
const config = require('../config/config');
const { codes } = require('../config/codes');
const validators = require('../middlewares/validators');
// const { validationResult } = require('express-validator');
// const rsaDecryption = require('../middlewares/rsaDecryption');
// const key = require('../routes/encryptionRoute')

// services
const manageUsers = require('../services/manageUserService')

// configs
const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
    }
});

//checks for duplicate emails before user registration
exports.checkDuplicateEmails = async (req, res, next) => {
    try {
        let { email } = req.params;
        let results = await manageUsers.getEmail(email);

        if (results.length === 1) {
            return res.status(409).send(codes(409, null, "The email has already been taken."))
        } else {
            return res.status(200).send(codes(200, null, results));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500));
    }
}

//checks for duplicate numbers before user registration
exports.checkDuplicateNumbers = async (req, res, next) => {
    try {
        let { number } = req.params;
        let results = await manageUsers.getNumber(number);

        if (results.length === 1) {
            return res.status(409).send(codes(409, null, "The number has already been taken."))
        } else {
            return res.status(200).send(codes(200, null, results));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500));
    }
}

// Used by the secondary admin to add the user into the account with valid check
exports.addUser = async (req, res, next) => {
    try {

        await validators.validateText(req.body.password)
        .catch((error) => {
            console.log(error)
        });


        let data = {
            firstName: validators.validateText(req.body.firstName),
            lastName: validators.validateText(req.body.firstName),
            email: validators.validateEmail(req.body.email),
            password: validators.validateText(req.body.password),
            contact: validators.validateInt(req.body.contact)
        }

        let { firstName, lastName, email, password, contact, privilege } = data;

        // guard statement
        if (privilege == null) privilege = 4;
        if (!(firstName && lastName && email && password && contact)) return res.status(401).send(codes(401, 'Missing information.'));

        // adding user info
        await manageUsers.addUser(firstName, lastName, email, contact, privilege)
            .catch((error) => {
                return res.status(401).send(codes(500, 'Internal error.'));
            });

        // adding login info
        let results = await manageUsers.getEmail(email)
            .catch(error => {
                console.log("Failure detected here")
            });
        let { user_guid } = results[0]
        let hashedPassword = await bcrypt.hash(password, 10);
        let secret = speakeasy.generateSecret({ length: 20, });

        await manageUsers.addUserLogin(user_guid, hashedPassword, secret.base32)
            .catch((error) => {
                console.log(error)
                return res.status(401).send(codes(500, 'Internal error.'));
            });
        return res.status(200).send(codes(200));
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500));
    }
};

exports.verifyRole = async (req, res, next) => {
    try {
        let { userId } = req;
        let results = await manageUsers.getRole(userId);

        return res.status(200).send(codes(200, null, results));
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500));
    }
}

// generating 2FA QRCode
exports.generate2FA = async (req, res, next) => {
    try {
        let { user_guid } = req;

        let secret = speakeasy.generateSecret({ length: 20, });

        console.log(secret.base32)
        await manageUsers.add2FA(user_guid, secret.base32)
        let qrcodeURL = await qrcode.toDataURL(secret.otpauth_url);

        return res.status(200).send(codes(200, { qrcodeURL: qrcodeURL }));
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500));
    }
}