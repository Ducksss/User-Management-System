// imports
const limiter = require('../middlewares/rateLimiter');
// controllers
const loginController = require('../controllers/loginController');

exports.route = router => {
    // Verifies the user credentials to ensure they are the right person
    router.post('/api/u/user/signin', limiter.loginLimiter, loginController.processUserLogin);
};