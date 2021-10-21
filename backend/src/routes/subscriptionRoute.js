const subscriptionController = require('../controllers/subscriptionController');

exports.route = router => {
    router.post('/api/u/subscription/webhook' , subscriptionController.webhook)
    router.get('/api/u/subscription/config', subscriptionController.config);
    router.get('/api/u/subscription/create_customer', subscriptionController.createCustomer);
    router.post('/api/u/subscription/create', subscriptionController.createSubscription);
    router.post('/api/u/subscription/cancel', subscriptionController.cancelSubscription);
    router.get('/api/u/subscription/subscriptions', subscriptionController.subscriptions);
}