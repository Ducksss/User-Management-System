const resettingPasswordController = require('../controllers/resettingPasswordController')

exports.route = router => {
    router.post('/api/u/user/begin-reset-password/:email', resettingPasswordController.generateOTP);
}