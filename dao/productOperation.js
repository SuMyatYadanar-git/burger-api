const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getAllproduct = (req, res) => {
    mysqlConnection.query('SELECT * FROM product WHERE status=0', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.newProduct = (req, res, post) => {
    mysqlConnection.query('INSERT INTO product(p_img,p_name,p_price,description,status) VALUES(?,?,?,?,?)', [post.img, post.name, post.price, post.description, 0], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM product WHERE status=0', (err1, row1, field1) => {
                if (!err1) {
                    res.json(response({ success: true, payload: row1, id: row.insertId }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            mysqlConnection.query('SELECT * FROM product where status=0', (err, row, field) => {
                if (!err) {
                    res.status(200).json(response({ success: true, payload: row }))
                } else {
                    res.json(response({ success: false, message: err }))
                }
            })
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.updateProduct = (req, res, post) => {
    const filter = post.img === '' ? '' : `p_img='${post.img}',`
    mysqlConnection.query(`UPDATE product SET ${filter} p_name='${post.name}',p_price=${post.price},description='${post.description}' WHERE p_id='${post.id}'`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM product', (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1 }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            mysqlConnection.query('SELECT * FROM product where status=0', (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1 }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.updateDeleteProduct = (req, res, post) => {
    mysqlConnection.query(`UPDATE product SET status=1 WHERE p_id=${post.id}`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM product WHERE status=0', (err1, row1, field1) => {
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