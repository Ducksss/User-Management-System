const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodeMailer = require('nodemailer');
const moment = require("moment-timezone");
const config = require("../config/config");
const { codes } = require('../config/codes');

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

exports.generateOTP = async (req, res, next) => {
    try {
        const { email } = req.params
        const userInformation = await loginService.authenticateUser(email)
            .catch((error) => {
                console.log(error)
                return res.status(401).send(codes(401, 'Insertion of OTP has failed'))
            });

        console.log(userInformation)
        if (userInformation.length != 1) {
            return res.status(401).send(codes(401, 'Invalid Credentials.'));
        }

        const token = Math.floor(100000 + Math.random() * 900000);
        const { first_name, last_name, user_guid } = userInformation[0];
        await resettingPasswordService.insertVerificationCode(user_guid, token)
            .catch((error) => {
                console.log(error)
            })

        transporter.sendMail({
            //Insert admin email here
            from: 'Automated User Management system <noreply@UserManagementSystem.com>',
            to: `${email}`,
            subject: 'OTP Code from UMS',
            html: `<div>
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
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:start">
                                                                                                                    <br></div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;border-top-style:initial;border-right-style:initial;border-bottom-style:initial;border-left-style:initial;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;margin-top:0px;margin-right:0px;margin-bottom:10px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;outline-color:initial;outline-style:initial;outline-width:0px;font-weight:400;vertical-align:baseline;color:#252a2e;font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;font-size:16px">
                                                                                                                        You requested a password reset, please use the confirmation code below to complete the process. If you didn't make this request, ignore this email.
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <br></div>
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
                                                                                                                            <b>${token}</b>
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
                                                                                                                        If your OTP does not work, please request for a new confirmation code.
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <br></div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-size:16px;color:#252a2e">Yours
                                                                                                                        regards,</span>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    style="font-family:inherit;text-align:inherit">
                                                                                                                    <span
                                                                                                                        style="font-family:-apple-system,&quot;.SFNSDisplay-Regular&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:start;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;float:none;display:inline;font-size:16px;color:#252a2e">-Automated EISO Management system</span>
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

        const data = {
            token: jwt.sign(
                {
                    email: email,
                },
                config.JWTKey, {
                expiresIn: 600
            })
        };

        return res.status(200).send(codes(200, "", data));
    } catch (e) {
        return res.status(500).send(codes(500, 'Unable to complete update (users) operation'))
    }
}