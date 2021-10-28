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