const mysqlConnection = require('../connection/db')
const jwt = require('jsonwebtoken')

module.exports.postLogin = (req, res) => {
    const user_name = req.body.user_name
    const pwd = req.body.pwd
    mysqlConnection.query('SELECT * FROM user WHERE binary user_name=  "' + user_name + '" ', (err, row, field) => {
        if (row.length > 0) {
            if (pwd === row[0].pwd) {
                const user = { id: row[0].id, name: row[0].user_name, Addrress: 'burgershopapp' }
                mysqlConnection.query('SELECT * FROM user WHERE id=?', [row[0].id], (err1, row1, field1) => {
                    if (err1) res.json({ err1 })
                    else {
                        jwt.sign({ user: user }, 'forAuthenticationSecurityTokenofburgershop', { expiresIn: '1d' }, (err, token) => {
                            res.status(200).json({ payload: row1, success: true, token: token, message: 'login success', })
                        })
                    }
                })
            } else {
                res.status(401).json({ success: false, message: 'wrong password' })
            }
        }  else {
            res.status(500).json({ success: false, message: 'Incorrect username and password' })
        }
    })
}