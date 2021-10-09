const subscriptionController = require('../controllers/subscriptionController');

exports.route = router => {
    router.get('/api/u/user/config', subscriptionController.config);
    router.get('/api/u/user/createCustomer', subscriptionController.createCustomer);
    router.post('/api/u/user/createSubscription', subscriptionController.createSubscription);
    router.post('/api/u/user/cancelSubscription', subscriptionController.cancelSubscription);
    router.get('/api/u/user/subscriptions', subscriptionController.subscriptions);
}