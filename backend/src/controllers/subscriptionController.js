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

// Get customerID when register is done.
// Get user information
exports.config = async (req, res, next) => {
    const prices = await stripe.prices.list({
        lookup_keys: ['sample_basic', 'sample_premium'],
        expand: ['data.product']
    });

    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        prices: prices.data,
    });
};


exports.createCustomer = async (req, res, next) => {
    // Create a new customer object
    const customer = await stripe.customers.create({
        email: req.body.email,
    });

    // Save the customer.id in your database alongside your user.
    // We're simulating authentication with a cookie.
    res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });

    res.status(200).send(codes(200, { customer: customer }));
};

exports.createSubscription = async (req, res, next) => {
    // Simulate authenticated user. In practice this will be the
    // Stripe Customer ID related to the authenticated user.
    // const customerId = req.cookies['customer'];
    // Create the subscription
    const priceId = req.body.priceId;

    try {
        const subscription = await stripe.subscriptions.create({
            customer: "cus_KNJSNtDx8Szceq",
            items: [{
                price: priceId,
            }],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
        });
        
        res.status(200).send(codes(200, null,{
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        }));
    } catch (error) {
        return res.status(400).send(codes(400));
    }
};

exports.invoicePreview = async (req, res, next) => {
};

exports.cancelSubscription = async (req, res, next) => {
    // Cancel the subscription
    try {
        const deletedSubscription = await stripe.subscriptions.del(
            req.body.subscriptionId
        );
        res.status(200).send(codes(200, null,{
            subscription: deletedSubscription 
        }));
    } catch (error) {
        return res.status(400).send(codes(400));
    }
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
    res.json({ subscriptions });
};
exports.webhook = async (req, res, next) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event =req.body;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.header('Stripe-Signature'),
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }

    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    console.log(event.type)
    console.log("event type")
    switch (event.type) {
      case 'invoice.payment_succeeded':
        if(dataObject['billing_reason'] == 'subscription_create') {
          // The subscription automatically activates after successful payment
          // Set the payment method used to pay the first invoice
          // as the default payment method for that subscription
          const subscription_id = dataObject['subscription']
          const payment_intent_id = dataObject['payment_intent']

          // Retrieve the payment intent used to pay the subscription
          const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

          const subscription = await stripe.subscriptions.update(
            subscription_id,
            {
              default_payment_method: payment_intent.payment_method,
            },
          );

          console.log("Default payment method set for subscription:" + payment_intent.payment_method);
        };

        break;
      case 'invoice.payment_failed':
        console.log(event.data.object)
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
      case 'invoice.finalized':
        console.log(event.data.object)
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          console.log(event.data.object)
          // handle a subscription cancelled by your request
          // from above.
        } else {
          console.log(event.data.object)
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      case 'customer.subscription.trial_will_end':
        console.log(event.data.object)
        // Send notification to your user that the trial will end
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
};