// imports
const limiter = require('../middlewares/rateLimiter')
// controllers
const loginController = require('../controllers/loginController');

exports.route = router => {
    router.post('/api/u/user/signin', limiter.loginLimiter, loginController.processUserLogin);
}