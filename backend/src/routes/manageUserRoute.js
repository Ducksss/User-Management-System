const manageUserController = require('../controllers/manageUserController');
const middlewares = require('../middlewares/middleware');
const validators = require('../middlewares/validators')

exports.route = router => {
    // without middlewear
    router.get('/api/u/user/:email/available', manageUserController.checkDuplicateEmails);

    // with middlewear
    router.post('/api/u/user/create-account', manageUserController.addUser);
    router.get('/api/u/user/role', middlewares.isLoggedIn, validators.validateAddUser, manageUserController.verifyRole);
}