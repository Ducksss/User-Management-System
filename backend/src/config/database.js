const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'test-pet-project.cuxgk5v6hdfq.ap-southeast-1.rds.amazonaws.com',
    user: config.databaseUserName,
    password: config.databasePassword,
    database: config.databaseName,
});

module.exports = pool;