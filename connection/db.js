const mysql = require('mysql2')

const config = require('../config/config')

const mc = mysql.createPool(config.database)
mc.getConnection((err) => {
    if (!err) {
        console.log('connected with database')
    } else {
        console.log('connection failed with mysql_db', err)
    }
});

module.exports = mc