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