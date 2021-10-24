const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodeMailer = require('nodemailer');
const moment = require("moment");
const config = require("../config/config");
const { codes } = require('../config/codes');
const validators = require('../middlewares/validators');

// services
const loginService = require('../services/loginService');
const manageUsers = require('../services/manageUserService');
const resettingPasswordService = require('../services/resettingPasswordService')

// configs
let transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
    }
})

/**
 * Forgot Password
 */
exports.generateOTP = async (req, res, next) => {
    try {
        const { email } = req.params;

        const userInformation = await loginService.authenticateUser(email)

        // if no user, break and don't send any email
        if (userInformation.length != 1) {
            return res.status(401).send(codes(401, 'Invalid Credentials.'));
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const { first_name, last_name, user_id, user_guid } = userInformation[0];

        await resettingPasswordService.insertVerificationCode(user_id, verificationCode);

        const verificationInformation = await resettingPasswordService.fetchInsertedVerificationCode(user_id, verificationCode)
            .catch((error) => {
                console.log(error);
            });

        const { verification_id } = verificationInformation[0];
        const data = {
            token: jwt.sign(
                {
                    user_guid: user_guid,
                    email: email,
                    verification_id: verification_id,
                    verificationCode: verificationCode
                },
                config.JWTKey,
                {
                    expiresIn: 1000
                }
            )
        };

        transporter.sendMail({
            //Insert admin email here
            from: 'User Management System <noreply@UMS.com>',
            to: `${email}`,
            subject: 'Your UMS password reset request',
            html: `
                <div>
                    <center class="m_4493907587022712475wrapper">
                        <div>
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="m_4493907587022712475wrapper"
                                bgcolor="#FFFFFF">
                                <tbody>
                                    <tr>
                                        <td valign="top" bgcolor="#FFFFFF" width="100%">
                                            <table width="100%" role="content-container" align="center" cellpadding="0" cellspacing="0"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td width="100%">
                                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                
                                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                                border="0" style="width:100%;max-width:600px"
                                                                                align="center">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td role="modules-container"
                                                                                            style="padding:0px 0px 0px 0px;color:#000000;text-align:left"
                                                                                            bgcolor="#FFFFFF" width="100%" align="left">
                                                                                            <table
                                                                                                class="m_4493907587022712475preheader"
                                                                                                role="module" border="0" cellpadding="0"
                                                                                                cellspacing="0" width="100%"
                                                                                                style="display:none!important;opacity:0;color:transparent;height:0;width:0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td role="module-content">
                                                                                                            <p></p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <table border="0" cellpadding="0"
                                                                                                cellspacing="0" align="center"
                                                                                                width="100%" role="module"
                                                                                                style="padding:0px 0px 0px 0px"
                                                                                                bgcolor="#FFFFFF">
                                                                                                <tbody>
                                                                                                    <tr role="module-content">
                                                                                                        <td height="100%" valign="top">
                                                                                                            <table width="580"
                                                                                                                style="width:580px;border-spacing:0;border-collapse:collapse;margin:0px 10px 0px 10px"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                align="left" border="0"
                                                                                                                bgcolor=""
                                                                                                                class="m_4493907587022712475column">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td
                                                                                                                            style="padding:0px;margin:0px;border-spacing:0">
                                                                                                                            <table
                                                                                                                                class="m_4493907587022712475wrapper"
                                                                                                                                role="module"
                                                                                                                                border="0"
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="0"
                                                                                                                                width="100%"
                                                                                                                                style="table-layout:fixed">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px"
                                                                                                                                            valign="top"
                                                                                                                                            align="center">
                                                                                                                                            <img class="m_4493907587022712475max-width CToWUd"
                                                                                                                                                border="0"
                                                                                                                                                style="display:block;color:#000000;text-decoration:none;font-family:Helvetica,arial,sans-serif;font-size:16px;max-width:25%!important;width:25%;height:auto!important"
                                                                                                                                                width="145"
                                                                                                                                                alt=""
                                                                                                                                                src="https://res.cloudinary.com/sp-dit-chai-pin-zheng/image/upload/v1629136047/f27qbnovb3dupgcan98e.jpg">
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <table role="module" border="0"
                                                                                                cellpadding="0" cellspacing="0"
                                                                                                width="100%" style="table-layout:fixed">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit"
                                                                                                            height="100%" valign="top"
                                                                                                            bgcolor=""
                                                                                                            role="module-content">
                                                                                                            <div>
                                                                                                                <div style="font-family:inherit;text-align:start">
                                                                                                                    <span style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;border-top-style:initial;border-right-style:initial;border-bottom-style:initial;border-left-style:initial;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;margin-top:0px;margin-right:0px;margin-bottom:10px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;outline-color:initial;outline-style:initial;outline-width:0px;font-weight:400;vertical-align:baseline;color:#252a2e;font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;font-size:16px">Dear ${first_name + " " + last_name},</span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:start">
                                                                                                                    <br></div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;border-top-style:initial;border-right-style:initial;border-bottom-style:initial;border-left-style:initial;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;margin-top:0px;margin-right:0px;margin-bottom:10px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;outline-color:initial;outline-style:initial;outline-width:0px;font-weight:400;vertical-align:baseline;color:#252a2e;font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;font-size:16px">
                                                                                                                        A request has been received to change the password for your UMS account.
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div style="font-family:inherit;text-align:inherit">
                                                                                                                <br></div>
                                                                                                            <div
                                                                                                                style="font-family:inherit;text-align:inherit">
                                                                                                                <span
                                                                                                                    style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;border-top-style:initial;border-right-style:initial;border-bottom-style:initial;border-left-style:initial;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;margin-top:0px;margin-right:0px;margin-bottom:10px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;outline-color:initial;outline-style:initial;outline-width:0px;font-weight:400;vertical-align:baseline;color:#252a2e;font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;font-size:16px"></span>
                                                                                                            </div>
                                                                                                            <div></div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table border="0" cellpadding="0"
                                                                                            cellspacing="0" role="module"
                                                                                            style="table-layout:fixed" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" bgcolor=""
                                                                                                        style="padding:0px 0px 0px 0px">
                                                                                                        <table border="0"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            class="m_4493907587022712475wrapper-mobile"
                                                                                                            style="text-align:center">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td align="center"
                                                                                                                        bgcolor="#321fdb"
                                                                                                                        style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit">
                                                                                                                        <a href="http://localhost:3004/acccount/reset_password/${data.token}"
                                                                                                                            style="background-color:#321fdb;border:0px solid #333333;border-color:#333333;border-radius:4px;border-width:0px;color:#ffffff;display:inline-block;font-size:16px;font-weight:700;letter-spacing:0px;line-height:normal;padding:12px 18px 12px 18px;text-align:center;text-decoration:none;border-style:solid"
                                                                                                                            target="_blank"
                                                                                                                            data-saferedirecturl="https://www.google.com/url?q=http://url6312.coreui.io/ls/click?upn%3DzYcg0S-2FzDXu459e3sth3RJeidPi8smGI64DUWxreqbx7uH9dvu9SbozstYcne-2BE2VCf0757GQ1QMCUMmTbJQqUJzs-2Bns7ErRdOGnUEIt7j6YS0cgKKoO-2BxSDf8qMZ-2BFslDl6XxVKMTSpCE0qZce8ZSvMP5k0prAY0CIr-2FcSYPS5pIDojh0y2PlpTjcdpn3FYO-2F3DFHLXyUrKCgdo1KK-2F6g-3D-3DW3fN_ndFMJpcCIGXHo1VJty3Pr-2FLtmK191lDwToRcRw2pMHsjJ9N6iSgpX5Kal6lnrooJL24Y9CGJxndH85Fv-2Bqsp6Q53fj3O52IoQHaSvhm5ooqGyjL-2F0jnRCj8902bGYqj5Pis-2FLVf-2BiaGGPOgQbtLlPS9jb1IJkLRytvJECCfaALR6KQDFYuL5J6sl0-2BXCSRo2pGEw3iGLB-2FWEiiPSfkWpixT26NWCPaN4D0Ud-2By7WF1l-2BZ3meeyy9W5WTnsCbYtld-2Bg1MgFoDx21ZPlbdM6BcfzlY-2BvTOjOl5VqruCB7ncwCuUrhTncQZT88HZoEqxC78Xpayt4Nk0ohDdAOvv-2FirsBIvjpb8q9POVsGgedXORFI-3D&amp;source=gmail&amp;ust=1629219091591000&amp;usg=AFQjCNEwhklbqiHn8aJzAhOk_fs2_4QFLw">
                                                                                                                            Reset password</a>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                            <table role="module" border="0"
                                                                                                cellpadding="0" cellspacing="0"
                                                                                                width="100%" style="table-layout:fixed">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit"
                                                                                                            height="100%" valign="top"
                                                                                                            bgcolor=""
                                                                                                            role="module-content">
                                                                                                            <div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-size:16px;color:#252a2e">
                                                                                                                        If you did not initiate this request, please contact us immediately at support@UMS.com.
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <br></div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-size:16px;color:#252a2e">Yours
                                                                                                                        Thank you,
                                                                                                                        <br>
                                                                                                                        The UMS Team
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-size:16px;color:#252a2e"></span>
                                                                                                                </div>
                                                                                                                <div></div>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </center>
                    <img src="https://ci5.googleusercontent.com/proxy/CEPy5eFGvyIRlvcnCOnqlCdKECAjNDnITs_vT52gGZts_oBXlshxTwEXqEPhjlhqzWfqn-uJooDcjhWwpaskMNMe7cee7lbJe1WpyhW28UyMPJM2UmBz9ycS6iMTHjuQnL0uCXYUo5w9rwdEoIy_YTnCi6HDubCpVVC3ovkjekGZaelitJegLZiThdcywwy3cNnn83HLZgmhXdLCMULDUNTe7mQYkr3fOo_v1CprLPLkS54mayVJjwc_sIy7O7qMUawwI4IW9vpjhZsUS4gnQbSpAFvG3FvoYTct1IJ-cgR9fSlcYyV7plYjytmOvr9NN-Z_H2t_2GfkDPH7vuaUzdnuybe_d8qbcV20t-1BWKg-dtTvO_B4yyXDBryICq0YStuxu97D_15b4wIdYo5_fcmAg62F5NJDzJF710Zbh_sykdVAeBPlvGvnQz6qPHdmlhWGvrwcyrVLAUHVDLqv2HMpVhfqHmG2xFR6IpbArsINgHStc9J75zOKV3NktcS9Cne_K6AXkOUIuKn-sULKJOFL7mtlNcYZR3_iAOVtda4IKCjgFlX2JWlXLLFDLaYuVJ9kx7WQfRiw_xQ=s0-d-e1-ft#http://url6312.coreui.io/wf/open?upn=So99Xn0ChFadw29Znvo8HN8WeqVuS28KqfHIPLQzihGPnPbFuSuC7ujzRP5AjbEz4hlc3KxrnPipglYwaMdFYD02je4lirgR6iNngsTfTdKJe7vGcrVNvKk3JFcN5dPqYuCzjxizl-2FUND5MFpiQXIbJPWm7zlI3dJV5e-2BwRSTLK37KoTsOnxvnHyoJT-2B4dTGYON0OIwXE-2FOkaggpn5i0S-2BiO39LENKClxZq0mq-2BcDfUFUiNHDJNK5fiySHk-2FNYySazZDi1pPCK4irnhW8vzgGrOEbQfwPD42WhJFPTCmR1AwyO0rWBp-2FyRToTGD6eXoUX8q7y3Q8-2FdUU5BLQNvsXW7iDD-2Fs6b0CaIv7rqOzQzR4-3D"
                        alt="" width="1" height="1" border="0"
                        style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important"
                        class="CToWUd">
                </div>`
        });

        return res.status(200).send(codes(200, "", data));
    } catch (e) {
        console.log(e)

        if (e == 'Insertion of OTP has failed') return res.status(401).send(codes(401, 'Insertion of OTP has failed'))

        return res.status(500).send(codes(500, 'Unable to complete update (users) operation'))
    }
}

exports.verifyResetPasswordParamToken = async (req, res, next) => {
    try {
        const { token, part } = req.body;
        const jwtObject = jwt.verify(token, config.JWTKey);
        const { user_guid, verificationCode } = jwtObject;

        // Translator
        let getUserData = await manageUsers.isLoggedIn(user_guid);
        let result = await resettingPasswordService.verifyToken(getUserData[0].user_id, verificationCode)

        if (result.length !== 1) return res.status(403).send(codes(403));

        if (result[0].verification_code !== verificationCode) {
            return res.status(403).send(codes(403), "", "Your token has expired. Please try again");
        }

        if (result[0].type === 1) return res.status(403).send(codes(403), "", "It has already been done");

        const currentUTCTiming = moment.utc();
        const databaseTiming = moment.utc(result[0].created_at);
        const isPassedLimit = (currentUTCTiming - databaseTiming) / (10 * 60 * 100) > 5;

        if (isPassedLimit) {
            return res.status(408).send(codes(408));
        } else {
            if (part === "store") next();
            return res.status(204).send(codes(204));
        }

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send(codes(401))
        }

        console.log(error)
        return res.status(500).send(codes(500, 'Unable to complete update (users) operation'))
    }
}

exports.verifyPasswordUniquness = async (req, res, next) => {
    try {
        const { token, incomingPassword, part } = req.body;
        const { user_guid, verification_id } = jwt.verify(token, config.JWTKey);

        const userPasswordHistory = await manageUsers.isLoggedIn(user_guid);
        const { user_id, password_hash, pasword_hash_history_1, pasword_hash_history_2 } = userPasswordHistory[0];

        if (!incomingPassword) {
            return res.status(400).send(codes(400));
        } else {
            let isRepeated0 = await bcrypt.compare(incomingPassword, password_hash)
            if (isRepeated0) return res.status(401).send(codes(401));

            if (pasword_hash_history_1) {
                let isRepeated1 = await bcrypt.compare(incomingPassword, pasword_hash_history_1);
                if (isRepeated1) return res.status(401).send(codes(401))
            }

            if (pasword_hash_history_2) {
                let isRepeated2 = await bcrypt.compare(incomingPassword, pasword_hash_history_2)
                if (isRepeated2) return res.status(401).send(codes(401));
            }


            if (part === "store") {
                req.user_id = user_id;
                req.currentPassword = password_hash;
                req.oldPassword1 = pasword_hash_history_1;
                req.verification_id = verification_id;
                next();
            } else {
                return res.status(200).send(codes(200));
            }
        }
    } catch (error) {
        if (error == 'none found') return res.status(404).send(codes(404))
        return res.status(500).send(codes(500));
    }
}

exports.updateNewPassword = async (req, res, next) => {
    try {
        const { incomingPassword } = req.body;
        const { user_id, currentPassword, oldPassword1, verification_id } = req;

        const hashedIncomingPassword = await bcrypt.hash(incomingPassword, 10);

        await manageUsers.updateLoginAttempts(0, user_id);
        await resettingPasswordService.verificationCompleted(verification_id);
        await resettingPasswordService.updateCurrentPassword(user_id, hashedIncomingPassword, currentPassword, oldPassword1);

        return res.status(200).send(codes(200));
    } catch (err) {
        console.log(err)
        if (err = 'cannot update') return res.status(401).send(codes(401))
        return res.status(500).send(codes(500));
    }
}

/**
 * Reset Password
 */
exports.verifyCurrentAndOld = async (req, res, next) => {
    try {
        const { user_id, user_guid } = req;
        const { incomingCurrent, incomingPassword, part } = req.body;

        const userPasswordHistory = await manageUsers.isLoggedIn(user_guid);
        const { password_hash, pasword_hash_history_1, pasword_hash_history_2 } = userPasswordHistory[0];

        if (!incomingPassword) {
            return res.status(400).send(codes(400));
        } else {
            // if current password doesn't match old password
            const isCorrect = await bcrypt.compare(incomingCurrent, password_hash);
            if (!isCorrect) return res.status(400).send(codes(400, null, "Error. Your current password was incorrect."));

            if (part === "store") {
                req.part = part;
                req.user_id = user_id;
                req.currentPassword = password_hash;
                req.oldPassword1 = pasword_hash_history_1;
                req.oldPassword2 = pasword_hash_history_2;
                next();
            } else {
                return res.status(200).send(codes(200));
            }
        }
    } catch (e) {
        if (error == 'none found') return res.status(404).send(codes(404))
        return res.status(500).send(codes(500));
    }
}

exports.verifyResetPasswordUniqueness = async (req, res, next) => {
    try {
        const { incomingPassword, part } = req.body;
        let { user_id, user_guid, currentPassword, oldPassword1, oldPassword2 } = req;

        if (!incomingPassword) {
            return res.status(400).send(codes(400));
        } else {
            if (!(currentPassword && oldPassword1 && oldPassword2)) {
                const userPasswordHistory = await manageUsers.isLoggedIn(user_guid);
                let { user_id, password_hash, pasword_hash_history_1, pasword_hash_history_2 } = userPasswordHistory[0];

                currentPassword = password_hash;
                oldPassword1 = pasword_hash_history_1;
                oldPassword2 = pasword_hash_history_2;
            }

            let isRepeated0 = await bcrypt.compare(incomingPassword, currentPassword);
            if (isRepeated0) return res.status(401).send(codes(401));

            if (oldPassword1) {
                let isRepeated1 = await bcrypt.compare(incomingPassword, oldPassword1);
                if (isRepeated1) return res.status(401).send(codes(401))
            }

            if (oldPassword2) {
                let isRepeated2 = await bcrypt.compare(incomingPassword, oldPassword2);
                if (isRepeated2) return res.status(401).send(codes(401));
            }

            if (part === "store") {
                console.log("ENTERING HERE")
                next();
            } else {
                return res.status(200).send(codes(200));
            }
        }
    } catch (e) {
        if (e == 'none found') return res.status(404).send(codes(404));
        return res.status(500).send(codes(500));
    }
}

exports.updateResetNewPassword = async (req, res, next) => {
    try {
        console.log("please end me here")
        const { incomingPassword } = req.body;
        const { user_id, currentPassword, oldPassword1 } = req;
        const hashedIncomingPassword = await bcrypt.hash(incomingPassword, 10);

        await manageUsers.updateLoginAttempts(0, user_id);
        await resettingPasswordService.updateCurrentPassword(user_id, hashedIncomingPassword, currentPassword, oldPassword1);

        return res.status(200).send(codes(200));
    } catch (err) {
        console.log(err)
        if (err = 'cannot update') return res.status(401).send(codes(401))
        return res.status(500).send(codes(500));
    }
}