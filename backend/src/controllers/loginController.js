// imports
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

// Importing service's layer
const loginService = require('../services/loginService');
const manageUsers = require('../services/manageUserService')

// Status codes
const { codes } = require('../config/codes')

// Get user information
exports.processUserLogin = async (req, res, next) => {
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
            // req.user_guid = results[0].user_guid;
            // next();
            let data = {
                displayName: results[0].firstName + " " + results[0].lastame,
                email: results[0].email,
                token: jwt.sign({
                    user_guid: results[0].user_guid,
                    email: results[0].email,
                    privilege: results[0].privilege
                },
                    config.JWTKey, {
                    expiresIn: 3 * 60 //Expires in 3 mins
                })
            };

            let refresh_token = jwt.sign({
                _id: results[0].user_guid
                }, config.REFRESH_TOKEN_SECRET, {
                expiresIn: eval(config.REFRESH_TOKEN_EXPIRY)
            })

            let insertRefreshToken = await manageUsers.addRefreshToken(results[0].user_guid, refresh_token)

            if(insertRefreshToken) {
                res.cookie('refreshToken', refresh_token, {
                    httpOnly: true,
                    secure: true,
                    signed: true,
                    maxAge: 60 * 60 * 24 * 3 * 1000, //3 days
                    sameSite: "none",
                })
                
                console.log(data)
                return res.status(200).send(data);
            } else {
                return res.status(401).send(codes(401, 'Login failed.'));
            }
        } else {
            return res.status(401).send(codes(401, 'Login failed.'));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(codes(500, 'Internal error'));
    }
}