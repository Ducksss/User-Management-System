// services
const pricingService = require('../services/pricingService')
const config = require('../config/config');
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);
// Status codes
const { codes } = require('../config/codes')
exports.subscribe = async (req, res, next) => {
    try {
        let { token, price } = req.body;
        stripe.charges.create(
            {
                amount: price,
                currency: 'usd',
                amount: "100",
                source: token,
                description: `Payment for product`,
                metadata: {
                    productId: 'product.id'
                }
            },
            function (err, charge) {
                if (err) {
                    console.log(err)
                    return res.status(500).send(codes(500));
                }
                else { 
                    return res.status(200).send(codes(200)); }
            })
    } catch (error) {
        return res.status(500).send(codes(500));
    }
};