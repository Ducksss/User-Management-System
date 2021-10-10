// imports

// controllers
const loginController = require('../controllers/loginController');
const manageUserController = require('../controllers/manageUserController');

const validators = require('../middlewares/validators');
const limiter = require('../middlewares/rateLimiter')

exports.route = router => {
    router.post('/api/u/user/signin', limiter.loginLimiter, loginController.processUserLogin);
}