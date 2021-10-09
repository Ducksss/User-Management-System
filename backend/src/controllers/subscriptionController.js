// Status codes
const { codes } = require('../config/codes')
const config = require('../config/config');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/subscription-use-cases/fixed-price",
      version: "0.0.1",
      url: "https://github.com/stripe-samples/subscription-use-cases/fixed-price"
    }
  });
// Get user information
exports.createCustomer = async (req, res, next) => {
};
exports.createSubscription = async (req, res, next) => {
};
exports.invoicePreview = async (req, res, next) => {
};
exports.cancelSubscription = async (req, res, next) => {
};
exports.updateSubscription = async (req, res, next) => {
};
exports.subscriptions = async (req, res, next) => {
    // Simulate authenticated user. In practice this will be the
    // Stripe Customer ID related to the authenticated user.
    // const customerId = req.cookies['customer'];

    const subscriptions = await stripe.subscriptions.list({
        customer: "cus_KNJSNtDx8Szceq",
        status: 'all',
        expand: ['data.default_payment_method'],
    });
    console.log("it enters here")
    res.json({ subscriptions });
};