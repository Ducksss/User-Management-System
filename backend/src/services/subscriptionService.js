// imports
const config = require('../config/config');
const pool = require('../config/database')

module.exports.updateSubscription = (stripeSubscriptionID, stripeStatus, currentPeriodEnd, customerID, productID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            UPDATE 
                                subscriptions
                            SET 
                                stripe_status = ?,
                                current_period_end = ?,
                                customer_id = ?,
                                product_id = ?
                            WHERE 
                                stripe_subscription_id = ?              
                            `;
                connection.query(query, [stripeStatus, currentPeriodEnd, customerID, productID, stripeSubscriptionID], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject('cannot update')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.createSubscription = (stripeSubscriptionID, stripeStatus, currentPeriodEnd, customerID, productID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            INSERT INTO subscriptions (
                                stripe_subscription_id, stripe_status, 
                                current_period_end,
                                customer_id, product_id) 
                            values 
                            (?, ?, ?, ?, ?)             
                            `;
                connection.query(query, [stripeSubscriptionID, stripeStatus, currentPeriodEnd, customerID, productID], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject('cannot update')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.findSubscription = (subscriptionID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            SELECT 
                                *
                            FROM   
                                subscriptions
                            WHERE  
                                stripe_subscription_id = ?           
                            `;
                connection.query(query, [subscriptionID], (err, results) => {
                    if (err) {
                        reject('No subscription')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.updateInvoice = (stripeSubscriptionID, status, amountPaid, amountRemaining, paidAt, customerID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            UPDATE 
                                invoices
                            SET 
                                subscription_status = ?,
                                amount_paid = ?,
                                amount_remaining = ?,
                                paid_at = ?
                                fk_customer_id = ?
                            WHERE 
                                stripe_subscription_id = ?              
                            `;
                connection.query(query, [status, amountPaid, amountRemaining, paidAt, customerID, stripeSubscriptionID], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject('cannot update')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.createInvoice = (stripeSubscriptionID, status, amountPaid, amountRemaining, paidAt, customerID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            INSERT INTO invoices (
                                subscription_id, subscription_status, 
                                amount_paid, amount_remaining,
                                paid_at, fk_customer_id) 
                            values 
                            (?, ?, ?, ?, ?, ?)             
                            `;
                connection.query(query, [stripeSubscriptionID, status, amountPaid, amountRemaining, paidAt, customerID], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject('cannot update')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.findInvoice = (subscriptionID) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            SELECT 
                                *
                            FROM   
                                invoices
                            WHERE  
                                fk_customer_id = ?           
                            `;
                connection.query(query, [subscriptionID], (err, results) => {
                    if (err) {
                        reject('No subscription')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports.insertStripeCustomerInformation = (stripe_customer_id, user_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            INSERT INTO user_management_system.customers
                                (customer_stripe_id, user_id, created_at) 
                            values 
                                (?, ?, UTC_TIMESTAMP());
                            `;
                connection.query(query, [stripe_customer_id, user_id], (err, results) => {
                    if (err) {
                        reject('Insertion of OTP has failed')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports.getCustomerInformation = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            SELECT 
                                *
                            FROM 
                                user_management_system.customers 
                            where 
                                user_id = ?
                            `;
                connection.query(query, [user_id], (err, results) => {
                    if (err) {
                        reject('Fail to query for results')
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}