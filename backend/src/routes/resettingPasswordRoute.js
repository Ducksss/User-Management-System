const resettingPasswordController = require('../controllers/resettingPasswordController')

exports.route = router => {
    router.post('/api/u/user/begin-reset-password/:email', resettingPasswordController.generateOTP);
    router.post('/api/u/user/reset-password/verify-reset-token', resettingPasswordController.verifyResetPasswordParamToken);
    router.post('/api/u/user/reset-password/verify-password-uniqueness', resettingPasswordController.verifyPasswordUniquness);
}