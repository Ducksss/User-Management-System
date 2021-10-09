const manageUserController = require('../controllers/manageUserController');
const middlewares = require('../middlewares/middleware');
const limiter = require('../middlewares/rateLimiter');

exports.route = router => {

    // without middlewear
    router.get('/api/u/user/:email/available', manageUserController.checkDuplicateEmails);

    // with middlewear
    router.post('/api/u/user/create-account', limiter.registrationLimiter, manageUserController.addUser);
    router.get('/api/u/user/role', middlewares.isLoggedIn, manageUserController.verifyRole);
    router.get('/api/u/user/2fa', manageUserController.generate2FA)
}
