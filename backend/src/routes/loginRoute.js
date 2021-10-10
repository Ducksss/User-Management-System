const loginController = require('../controllers/loginController');
const validators = require('../middlewares/validators');
const limiter = require('../middlewares/rateLimiter')

exports.route = router => {
    router.post('/api/u/user/signin',validators.validateLogin(), limiter.loginLimiter, loginController.processUserLogin);
}