const loginController = require('../controllers/loginController');
const manageUserController = require('../controllers/manageUserController')

exports.route = router => {
    router.post('/api/u/user/signin', loginController.processUserLogin);
}