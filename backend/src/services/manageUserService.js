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

// verify if number has been taken and translating number to UUID
module.exports.getNumber = (number) => {
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
                                contact_number = ?;
                            `;
                connection.query(query, [number], (err, results) => {
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
module.exports.addUser = (firstName, lastName, email, contact, privilege) => {
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
module.exports.addUserLogin = (user_guid, password_hash, secret) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err);
            } else {
                try {
                    //stores current into repository of history
                    let query = `INSERT INTO user_management_system.logins(
                                login_guid, user_guid, password_hash, secret, created_at, 
                                    updated_at) VALUES (UUID(), ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())`;
                    connection.query(query, [user_guid, password_hash, secret], (err, results) => {
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

module.exports.add2FA = (user_guid, secret) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err);
            } else {
                try {
                    //stores current into repository of history
                    let query = `INSERT INTO user_management_system.verifications(
                                    verification_guid, user_guid, secret, 
                                    verification_attempt, type, created_at
                                ) 
                                VALUES 
                                    (UUID(), ?, ?, 0, 0, UTC_TIMESTAMP())
                                `;
                    connection.query(query, [user_guid, secret], (err, results) => {
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
}

// for dynamically displaying header functionality
module.exports.isLoggedIn = (user_guid, email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                try {
                    let query = `SELECT 
                                    user_guid
                                FROM 
                                    user_management_system.users
                                where 
                                    user_guid = ?
                                    and email = ?;
                                `;
                    connection.query(query, [user_guid, email], (err, results) => {
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


//add refresh token into db
module.exports.addRefreshToken = (userid, token) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Database connection error ", err);
                reject(err);
            } else {
                try {
                    let query = `
                                INSERT INTO
                                    refresh_tokens
                                        (user_guid, refresh_token)   
                                VALUES 
                                    (?,?)         
                                `
                    connection.query(query, [userid,token], (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        connection.release();
                    });
                } catch (error) {
                    console.log(error);
                    reject(error)
                }
            }
        })
    })
}

//get refresh token 
module.exports.findUserToken = (token) => {
    console.log(token);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `SELECT 
                                u.user_guid, u.email, u.privilege, rt.refresh_token, rt.times_used 
                            FROM 
                                refresh_tokens rt
                            JOIN
                                users u
                            ON
                                rt.user_guid=u.user_guid
                            where 
                                rt.refresh_token = ?;
                            `;
                connection.query(query, [token], (err, results) => {
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

//lock user  
module.exports.lockUser = (userid) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `UPDATE 
                                logins
                            SET
                                status = 3
                            WHERE 
                                user_guid = ?;
                            `;
                connection.query(query, [userid], (err, results) => {
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

//lock user  
module.exports.updateTimesUsed = (token, used) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `UPDATE 
                                refresh_tokens
                            SET
                                times_used = ?
                            WHERE 
                                refresh_token = ?;
                            `;
                connection.query(query, [used, token], (err, results) => {
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