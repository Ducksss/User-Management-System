const manageUserController = require('../controllers/manageUserController');
const middlewares = require('../middlewares/middleware');
const limiter = require('../middlewares/rateLimiter');

exports.route = router => {
    // without middlewear
    router.get('/api/u/user/email/:email/available', manageUserController.checkDuplicateEmails);
    router.get('/api/u/user/number/:number/available', manageUserController.checkDuplicateNumbers);

    // with middlewear
    router.post('/api/u/user/create-account', limiter.registrationLimiter, manageUserController.addUser, manageUserController.generateVerificationEmail);
    router.get('/api/u/user/role', middlewares.isLoggedIn, manageUserController.getUserPrivilege);
    router.get('/api/u/user/2fa', manageUserController.generate2FA)
}
