const jwt = require("jsonwebtoken");
const config = require('../config/config');
const { codes } = require('../config/codes');

const manageUserService = require('../services/manageUserService');
const { InvalidTokenError, NoTokenError } = require("../errors/TokenError");
const { StatusError } = require("../errors/AuthError");

exports.isLoggedIn = async (req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) return res.status(400).send(codes(400, 'Invalid Request'));
   
    try {
        let token = auth.split(' ')[1];
        if (!token)
        // return res.status(401).send(codes(401));
        throw new NoTokenError();

        let payload = jwt.verify(token, config.JWTKey);
        if (!payload) return res.status(401).send(codes(401))

        let { user_guid, email } = payload;
        let getLoggedInData = await manageUserService.isLoggedIn(user_guid);
        if (getLoggedInData.length == 1) {
            let getSuspendedAccount = await manageUserService.isSuspended(getLoggedInData[0].user_id);
            if (getSuspendedAccount[0].status == 0) {
                // not banned
                req.user_guid = user_guid;
                req.user_id = getLoggedInData[0].user_id;
                req.email = email;
                next();
            } else {
                // banned
                // return res.status(403).send(codes(403));
                throw new StatusError("Banned");
            }
        } else {
            // return res.status(401).send(codes(401));
            throw new StatusError("Locked Out");
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) return res.status(401).send(codes(401, 'Token Expired'));
        
            // return res.status(400).send(codes(400));
            next(error);
    }
};