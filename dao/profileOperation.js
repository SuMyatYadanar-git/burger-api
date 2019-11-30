const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getAllprofile = (req, res) => {
    mysqlConnection.query('SELECT * FROM profile', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.NewProfile = (req, res, post) => {
    mysqlConnection.query('INSERT INTO profile (address,name,img,mail,phone)VALUES(?,?,?,?,?)', [post.address, post.name, post.img, post.mail, post.phone], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM profile WHERE id=?', [row.insertId], (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1, id: row.insertId }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.deleteProfile = (req, res, id) => {
    mysqlConnection.query('DELETE FROM profile WHERE id=?', [id], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM profile', (err1, row1, field) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1 }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            res.json(response({ success: false, message: err }))
        }

    })
}