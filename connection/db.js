const mysql = require('mysql')

const config = require('../config/config')

const mc = mysql.createPool(config.database)
mc.getConnection((err)=> {
    if(!err){
        console.log('connected with database')
    }else{
        console.log('connection failed')
    }
});

module.exports = mc