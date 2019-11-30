const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getCategory = (req, res) => {
    mysqlConnection.query('SELECT * FROM category', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

// res.json(response({ success: true, payload:data }))
// }).catch(err =>{
//     res.json(response({ success: false, message: err })) 
// })

module.exports.newCategory = (req, res, img, name) => {
    mysqlConnection.query('INSERT INTO category(c_img,c_name)VALUES (?,?)', [img, name], (err, row, field) => {
        if (!err) {
            // console.log("do1")
            mysqlConnection.query('SELECT * FROM category WHERE c_id=?', [row.insertId], (err1, row1, field1) => {
                if (!err1) {
                    // console.log("do2")
                    res.status(200).json(response({ success: true, payload: row1, id: row.insertId }))
                } else {
                    // console.log("do3")
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            // console.log("do00")
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.editCategory = (req, res, post, id) => {
    mysqlConnection.query(`UPDATE category SET c_img='${post.img}',c_name='${post.name}' WHERE c_id='${id}'`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM category WHERE c_id=?', [id], (err1, row1, field1) => {
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

module.exports.deleteCategory = (req, res, id) => {
    mysqlConnection.query('DELETE FROM category WHERE c_id=?', id, (err, row, field) => {
        if (!err) {
            if (!err) {
                mysqlConnection.query('SELECT * FROM category', (err1, row1, field) => {
                    res.status(200).json(response({ success: true, payload: row1 }))
                    // res.status(200).json({ status: true, message: 'delete successfully', payload: row1, })
                })
            } else {
                res.json(response({ success: false, message: err1 }))
            }
        }
        else {
            res.json(response({ success: false, message: err }))
        }
    })
}
