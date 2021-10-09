const subscriptionController = require('../controllers/subscriptionController');

exports.route = router => {
    router.get('/api/u/user/createCustomer', subscriptionController.createCustomer);
    router.get('/api/u/user/subscriptions', subscriptionController.subscriptions);
}