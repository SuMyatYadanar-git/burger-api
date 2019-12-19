const mysqlConnection = require('../connection/db')
const response = require('../config/response')

module.exports.getAllprofile = (req, res) => {
    mysqlConnection.query('SELECT * FROM profile where status=0', (err, row, field) => {
        if (!err) {
            res.status(200).json(response({ success: true, payload: row }))
        } else {
            res.json(response({ success: false, message: err }))
        }
    })
}

module.exports.NewProfile = (req, res, post) => {
    // const filter = post.img === '' ? '' : `img='${post.img}',`
    mysqlConnection.query('INSERT INTO profile (address,name,img,mail,phone,status)VALUES(?,?,?,?,?,?)', [post.address, post.name, post.img, post.mail, post.phone,0], (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM profile where status=0', (err1, row1, field1) => {
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

module.exports.UpdateAllProfile = (req, res, post) => {
    const filter = post.img === '' ? '' : `img='${post.img}',`
    mysqlConnection.query(`UPDATE profile SET address='${post.address}',name='${post.name}',${filter} mail='${post.mail}',phone='${post.phone}' WHERE id='${post.id}'`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM profile where status=0', (err1, row1, field1) => {
                if (!err1) {
                    res.status(200).json(response({ success: true, payload: row1 }))
                } else {
                    res.json(response({ success: false, message: err1 }))
                }
            })
        } else {
            mysqlConnection.query('SELECT * FROM profile where status=0', (err1, row1, field1) => {
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

module.exports.updateDeleteProfile = (req, res, id) => {
    mysqlConnection.query(`UPDATE profile SET status=1 WHERE id=${id}`, (err, row, field) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM profile WHERE status=0', (err1, row1, field1) => {
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