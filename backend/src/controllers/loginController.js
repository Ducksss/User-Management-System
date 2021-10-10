// imports
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

// Importing service's layer
const loginService = require('../services/loginService');

// Status codes
const { codes } = require('../config/codes')

// Get user information
exports.processUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Checking for invalid credentials
        let results = await loginService.authenticateUser(email).catch((error) => {
            return res.status(401).send(codes(401, 'Invalid Credentials.'));
        });

        // Checking for invalid credentials
        if ((password == null) || (results[0] == null)) {
            return res.status(401).send(codes(401, 'Invalid Credentials.'));
        }

        // Checking for banned user
        if (results[0].status == 1) {
            return res.status(401).send(codes(401, 'Banned.'));
        }

        if (results[0].login_attempt == 10) {
            return res.status(401).send(codes(401, 'Locked Out.'));
        }

        if (bcrypt.compareSync(password, results[0].password_hash)) {
            let data = {
                displayName: results[0].firstName + " " + results[0].lastName,
                email: results[0].email,
                token: jwt.sign({
                    user_guid: results[0].user_guid,
                    email: results[0].email,
                    privilege: results[0].privilege
                },
                    config.JWTKey, {
                    expiresIn: 86400 //Expires in 24 hrs
                })
            };

            console.log(data)
            return res.status(200).send(data);
        } else {
            return res.status(401).send(codes(401, 'Login failed.'));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500, 'Internal error'));
    }
}