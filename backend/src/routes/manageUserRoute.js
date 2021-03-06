const manageUserController = require('../controllers/manageUserController');
const subscriptionController = require('../controllers/subscriptionController');
const middlewares = require('../middlewares/middleware');
const limiter = require('../middlewares/rateLimiter');

exports.route = router => {
    // without middlewear
    router.get('/api/u/user/email/:email/available', manageUserController.checkDuplicateEmails);
    router.get('/api/u/user/number/:number/available', manageUserController.checkDuplicateNumbers);
    router.get('/api/u/user/refresh-token', manageUserController.refreshToken);
    router.get('/api/u/user/logout', manageUserController.logout);

    // with middlewear
    router.post('/api/u/user/create-account', limiter.registrationLimiter, manageUserController.addUser, subscriptionController.createCustomer, manageUserController.generateVerificationEmail);
    router.get('/api/u/user/information', middlewares.isLoggedIn, manageUserController.getUserInformation);
    router.post('/api/u/verify-email-verification', manageUserController.verifyVerificationEmail);
    router.get('/api/u/user/role', middlewares.isLoggedIn, manageUserController.getUserPrivilege);
    router.get('/api/u/user/2fa', manageUserController.generate2FA); // to be deleted
};
