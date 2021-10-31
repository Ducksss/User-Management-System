const subscriptionController = require('../controllers/subscriptionController');

exports.route = router => {
    router.post('/webhook', subscriptionController.webhook)
    router.get('/api/u/subscription/config', subscriptionController.config);
    router.get('/api/u/subscription/create-customer', subscriptionController.createCustomer);
    // insert api here
    router.post('/api/u/subscription/create', subscriptionController.createSubscription);
    router.post('/api/u/subscription/cancel', subscriptionController.cancelSubscription);
    // insert api here
    router.get('/api/u/subscription/invoice', subscriptionController.invoicePreview);
    // insert api here
    router.get('/api/u/subscription/subscriptions', subscriptionController.subscriptions);
}