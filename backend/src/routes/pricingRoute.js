const pricingController = require('../controllers/pricingController');
const middlewares = require('../middlewares/middleware')

exports.route = router => {
    router.post('/api/u/pricing/subscribe', pricingController.subscribe);
}