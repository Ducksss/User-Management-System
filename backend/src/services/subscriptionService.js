// imports
const config = require('../config/config');
const pool = require('../config/database')

module.exports.updateSubscription = (user_id, hashedIncomingPassword, currentPassword, oldPassword1) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            UPDATE 
                                user_management_system.logins 
                            SET 
                                password_hash = ?,
                                pasword_hash_history_1 = ?,
                                pasword_hash_history_2 = ?
                            WHERE 
                                user_id = ?              
                            `;
                connection.query(query, [hashedIncomingPassword, currentPassword, oldPassword1, user_id], (err, results) => {
                    if (err) {
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