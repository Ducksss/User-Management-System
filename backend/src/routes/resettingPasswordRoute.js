const resettingPasswordController = require('../controllers/resettingPasswordController')

exports.route = router => {
    // generating link for the email
    router.post('/api/u/user/begin-reset-password/:email', resettingPasswordController.generateOTP);
    // cross validates the generated secret key in the jwt token + checks if the token is valid
    router.post('/api/u/user/reset-password/verify-reset-token', resettingPasswordController.verifyResetPasswordParamToken);
    // cross references the password in the database to ensure the password is unique (not the same as the last 3)
    router.post('/api/u/user/reset-password/verify-password-uniqueness', resettingPasswordController.verifyPasswordUniquness);
    // updates the password after checking the token is valid and password being unique
    router.post('/api/u/user/account/reset-password', resettingPasswordController.verifyPasswordUniquness, resettingPasswordController.updateNewPassword);
}