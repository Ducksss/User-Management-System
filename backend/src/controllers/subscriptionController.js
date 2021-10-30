// Status codes
const { codes } = require('../config/codes')
const dayjs = require('dayjs')
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

// Services
const subscriptionService = require('../services/subscriptionService')

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
    try {
        const { email, user_id } = req;
        // Create a new customer object
        const customer = await stripe.customers.create({ email: email });
        await subscriptionService.insertStripeCustomerInformation(customer.id, user_id)
        // Save the customer.id in your database alongside your user.
        // We're simulating authentication with a cookie.
        next();
    } catch (e) {
    }
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

        res.status(200).send(codes(200, null, {
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        }));
    } catch (error) {
        return res.status(400).send(codes(400));
    }
};

exports.invoicePreview = async (req, res, next) => {
    //pz change this
    let customerID = "cus_KNJSNtDx8Szceq"
    try {
        let invoiceData = await subscriptionService.findInvoice(customerID)
        console.log(invoiceData)
        res.status(200).send(codes(200, null, {
            invoiceData
        }));
    } catch (error) {
        return res.status(400).send(codes(400));
    }
};

exports.cancelSubscription = async (req, res, next) => {
    // Cancel the subscription
    try {
        const deletedSubscription = await stripe.subscriptions.del(
            req.body.subscriptionId
        );
        res.status(200).send(codes(200, null, {
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
        //pz enter customer id below
        customer: "cus_KNJSNtDx8Szceq",
        status: 'all',
        expand: ['data.default_payment_method'],
    });
    console.log(subscriptions)
    res.json({ subscriptions });
};

exports.webhook = async (req, res, next) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            req.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(err);
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(
            `⚠️  Check the env file and enter the correct webhook secret.`
        );
        return res.status(400).send(codes(400));
    }

    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
        case 'invoice.payment_succeeded':
            const Invoice = event.data.object;
            let stripeSubscriptionID = Invoice.id;
            let status = Invoice.status;
            let amountPaid = Invoice.amount_paid;
            let amountRemaining = Invoice.amount_remaining;
            let paidAt = dayjs(Invoice.status_transitions.paid_at * 1000).toDate();
            let customerID = Invoice.customer;

            try {
                let subscriptionData = await subscriptionService.findInvoice(stripeSubscriptionID)
                if (subscriptionData.length == 0) {
                    //Create subscription with relevant data
                    subscriptionData = await subscriptionService.createInvoice(stripeSubscriptionID, status, amountPaid, amountRemaining, paidAt, customerID)
                } else {
                    //Update subscription
                    subscriptionData = await subscriptionService.updateInvoice(stripeSubscriptionID, status, amountPaid, amountRemaining, paidAt, customerID)
                }

            } catch (error) {
                console.log(error)
            }
            // if (dataObject['billing_reason'] == 'subscription_create') {
            //     // The subscription automatically activates after successful payment
            //     // Set the payment method used to pay the first invoice
            //     // as the default payment method for that subscription
            //     const subscription_id = dataObject['subscription']
            //     const payment_intent_id = dataObject['payment_intent']

            //     // Retrieve the payment intent used to pay the subscription
            //     const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
            //     console.log("payment Intent")
            //     console.log(payment_intent)
            //     const subscription = await stripe.subscriptions.update(
            //         subscription_id,
            //         {
            //             default_payment_method: payment_intent.payment_method,
            //         },
            //     );

            //     console.log("Default payment method set for subscription:" + payment_intent.payment_method);
            // };

            break;
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            try {
                const subscription = event.data.object;
                let stripeSubscriptionID = subscription.id
                let subscriptionData = await subscriptionService.findSubscription(stripeSubscriptionID)
                if (subscriptionData.length == 0) {
                    //Create subscription with relevant data
                    subscriptionData = await subscriptionService.createSubscription(stripeSubscriptionID, subscription.status, dayjs(subscription.current_period_end * 1000).toDate(), subscription.customer, subscription.plan.product)
                } else {
                    //Update subscription
                    subscriptionData = await subscriptionService.updateSubscription(stripeSubscriptionID, subscription.status, dayjs(subscription.current_period_end * 1000).toDate(), subscription.customer, subscription.plan.product)
                }

            } catch (error) {
                console.log(error)
            }
            // If you want to manually send out invoices to your customers
            // or store them locally to reference to avoid hitting Stripe rate limits.
            break;
        default:
        // Unexpected event type
    }
    res.status(200).send(codes(200));
};