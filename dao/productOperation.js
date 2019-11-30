const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getAllproduct = (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.newProduct = (req, res, post) => {

    mysqlConnection.query('INSERT INTO product(p_img,p_name,p_price,description) VALUES(?,?,?,?)', [post.img, post.name, post.price, post.description], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM product WHERE p_id=?', [row.insertId], (err1, row1, field1) => {
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

module.exports.deleteProduct = (req, res, post) => {

    mysqlConnection.query('DELETE FROM product WHERE p_id=?', [post.id], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM product', (err1, row1, field) => {
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