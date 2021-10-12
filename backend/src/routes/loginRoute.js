// imports

// controllers
const loginController = require('../controllers/loginController');
const manageUserController = require('../controllers/manageUserController');

const validators = require('../middlewares/validators');
const limiter = require('../middlewares/rateLimiter')

exports.route = router => {
    // Verifies the user credentials to ensure they are the right person
    router.post('/api/u/user/signin', limiter.loginLimiter, loginController.processUserLogin);
}