const dao = require('../dao/userOperation')

module.exports.getLoginData = (req, res) => {
    const id = req.params.id
    dao.getLoginData(req, res, id)
}

module.exports.changePwd = (req, res) => {
    // console.log({ req: req.body })
    const pwd = req.body.pwd
    const id = req.body.id
    dao.changePwd(req, res, pwd, id)
}

module.exports.changeUserName =(req,res)=>{
    const name= req.body.info.name
    const id = req.body.info.id
    dao.changeUserName(req,res,name,id)
}

// module.exports.changePwd = (req, res) => {
//     mysqlConnection.query(`UPDATE SET user pwd=='${req.body.pwd}' WHERE id='${req.body.id}'`, (err, row, field) => {
//         if (!err) {
//             res.status(200).json({ success: true })
//         } else {
//             console.log('error', err)
//         }
//     })
// }