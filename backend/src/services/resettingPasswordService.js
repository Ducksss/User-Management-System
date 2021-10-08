// imports
config = require('../config/config');
const pool = require('../config/database')

// verify if email has been taken and translating email to UUID
module.exports.insertVerificationCode = (GUID, token) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            INSERT INTO user_management_system.verifications
                                (verification_guid, user_guid, verification_code, created_at) 
                            values 
                                (UUID(), ?, ?, UTC_TIMESTAMP());
                            `;
                connection.query(query, [GUID, token], (err, results) => {
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

module.exports.verifyToken = (user_guid, verificationCode) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            SELECT 
                                * 
                            FROM 
                                user_management_system.verifications 
                            where 
                                verification_code = ? 
                                and user_guid = ? 
                            order by 
                                created_at desc;         
                            `;
                connection.query(query, [verificationCode, user_guid], (err, results) => {
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

module.exports.retriveUserPasswordHistory = (user_guid) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            SELECT 
                                password_hash as currentPassword, 
                                pasword_hash_history_1 as oldPassword1, 
                                pasword_hash_history_2 as oldPassword2 
                            FROM 
                                user_management_system.logins 
                            where 
                                user_guid = ?;       
                            `;
                connection.query(query, [user_guid], (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results[0])
                    }
                    connection.release()
                })
            }
        })
    })
}