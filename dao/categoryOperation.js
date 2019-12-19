const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getCategory = (req, res) => {
    mysqlConnection.query('SELECT * FROM category where status=0', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.newCategory = (req, res, img, name) => {
    mysqlConnection.query('INSERT INTO category(c_img,c_name,status)VALUES (?,?,?)', [img, name, 0], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM category where status=0', (err1, row1, field1) => {
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

module.exports.editCategory = (req, res, post, id) => {
    const filter = post.img === '' ? '' : `c_img='${post.img}',`
    mysqlConnection.query(`UPDATE category SET ${filter} c_name='${post.name}' WHERE c_id='${id}'`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM category where status=0', (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1 }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            mysqlConnection.query('SELECT * FROM category where status=0', (err1, row1, field1) => {
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

module.exports.updateDeleteCategory = (req, res, id) => {
    mysqlConnection.query(`UPDATE category SET status=1 WHERE c_id=${id}`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM category WHERE status=0', (err1, row1, field1) => {
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