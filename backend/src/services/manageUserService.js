// imports
config = require('../config/config');
const pool = require('../config/database')

// verify if email has been taken and translating email to UUID
module.exports.getEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `SELECT 
                                user_guid 
                            FROM 
                                user_management_system.users 
                            where 
                                email = ?;
                            `;
                connection.query(query, [email], (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}

// adding user information to the database
module.exports.addUser = (firstName, lastName, email, contact, privilege, UTCDateFormat) => {
    
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err);
            } else {
                try {
                    //stores current into repository of history
                    let query = `INSERT INTO user_management_system.users(
                                    user_guid, email, contact_number, 
                                    first_name, last_name, privilege, created_at
                                )  VALUES (UUID(), ?, ?, ?, ?, ?, UTC_TIMESTAMP())`;
                    connection.query(query, [email, contact, firstName, lastName, privilege], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(results)
                            resolve(results);
                        }
                        connection.release();
                    });
                } catch (error) {
                    reject(error);
                }
            }
        });
    })
};

// adding user login information to the database
module.exports.addUserLogin = (user_guid, password_hash) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err);
            } else {
                try {
                    //stores current into repository of history
                    let query = `INSERT INTO user_management_system.logins(
                                login_guid, user_guid, password_hash, created_at, 
                                    updated_at) VALUES (UUID(), ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())`;
                    connection.query(query, [user_guid, password_hash], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(results)
                            resolve(results);
                        }
                        connection.release();
                    });
                } catch (error) {
                    reject(error);
                }
            }
        });
    })
};

// for dynamically displaying header functionality
module.exports.isLoggedIn = (userId, email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                try {
                    let query = `SELECT 
                                    user_id 
                                FROM 
                                    sp_shop.users 
                                where 
                                    user_id = ? 
                                    and email = ?;
                                `;
                    connection.query(query, [userId, email], (err, results) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(results)
                        }
                        connection.release()
                    })
                } catch (error) {
                    reject(error);
                }
            }
        })
    })
}

module.exports.isSuspended = (userId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `SELECT 
                                status 
                            from 
                                sp_shop.users 
                            where 
                                user_id = ? 
                            `;

                connection.query(query, [userId], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports.getRole = (userId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `SELECT 
                                type 
                            FROM 
                                sp_shop.users 
                            where 
                                user_id = ?;
                            `;
                connection.query(query, [userId], (err, results) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}