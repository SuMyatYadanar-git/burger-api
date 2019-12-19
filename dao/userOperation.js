const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getLoginData = (req, res, id) => {
    mysqlConnection.query('SELECT * FROM user WHERE id=?', [id], (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        }
        else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.changePwd = (req, res, pwd, id) => {
    mysqlConnection.query(`UPDATE user SET pwd='${pwd}' WHERE id='${id}'`, (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, message: 'updating your password!' }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.changeUserName = (req, res, name, id) => {
    mysqlConnection.query(`UPDATE  user SET user_name='${name}' WHERE id=?`, [id], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM user WHERE id=?', [id], (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1, message: 'updating your name !' }))
                }
                else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}