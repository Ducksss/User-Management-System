// imports
config = require('../config/config');
const pool = require('../config/database');

// verify if email has been taken and translating email to UUID
module.exports.insertVerificationCode = (user_id, token) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            INSERT INTO user_management_system.verifications
                                (user_id, verification_code, created_at) 
                            values 
                                (?, ?, UTC_TIMESTAMP());
                            `;
                connection.query(query, [user_id, token], (err, results) => {
                    if (err) {
                        reject('Insertion of OTP has failed');
                    } else {
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports.fetchInsertedVerificationCode = (user_id, verificationCode) => {
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
                            WHERE 
                                user_id = ?
                                and verification_code = ?                     
                            `;
                connection.query(query, [user_id, verificationCode], (err, results) => {
                    if (err) {
                        reject('Insertion of OTP has failed');
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports.verifyToken = (user_id, verificationCode) => {
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
                                and user_id = ? 
                            order by 
                                created_at desc;         
                            `;
                connection.query(query, [verificationCode, user_id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports.retriveUserPasswordHistory = (user_id) => {
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
                                user_id = ?;       
                            `;
                connection.query(query, [user_id], (err, results) => {
                    if (err) {
                        reject('none found');
                    } else {
                        resolve(results[0]);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports.updateCurrentPassword = (user_id, hashedIncomingPassword, currentPassword, oldPassword1) => {
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
                        reject('cannot update');
                    } else {
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports.verificationCompleted = (verification_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                let query = `
                            UPDATE 
                                user_management_system.verifications 
                            SET 
                                type = 1
                            WHERE 
                                verification_id = ?
                            `;
                connection.query(query, [verification_id], (err, results) => {
                    if (err) {
                        reject('cannot update');
                    } else {
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};