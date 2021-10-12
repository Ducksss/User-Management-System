// imports
const config = require('../config/config');
const pool = require('../config/database')

// Authenticates whether the user does exist and whether their email and password matches
module.exports.authenticateUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Database connection error ", err);
                reject(err);
            } else {
                try {
                    let query = `
                                SELECT
                                    users.user_guid,
                                    users.first_name, 
                                    users.last_name, 
                                    users.email, 
                                    users.privilege, 
                                    logins.password_hash, 
                                    logins.login_attempt
                                FROM 
                                    user_management_system.users as users, 
                                    user_management_system.logins as logins 
                                where 
                                    users.user_guid = logins.user_guid
                                    AND users.email = ?;
                                `;
                    connection.query(query, [email], (err, result) => {
                        if (err) {
                            console.log(err);
                            reject('Insertion of OTP has failed');
                        } else {
                            if (result.length == 1) {
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        }
                        connection.release();
                    });
                } catch (error) {
                    console.log(err);
                    reject('Insertion of OTP has failed');
                }
            }
        });
    }); // End of getConnection
} // End of authenticate
