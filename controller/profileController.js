const dao = require('../dao/profileOperation')

module.exports.getAllprofile = (req, res) => {
    dao.getAllprofile(req, res)
}

module.exports.NewProfile = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) res.json("upload err: ", err);
        else {
            const post = {
                address: req.body.address,
                name: req.body.name,
                img: req.file.filename,
                mail: req.body.mail,
                phone: req.body.phone
            }
            dao.NewProfile(req, res, post)
        }
    })
}

module.exports.deleteProfile=(req,res)=>{
    const id= req.params.id
    dao.deleteProfile(req,res,id)
}


// module.exports.getLoginData = (req, res) => {
//     const id = req.params.id
//     mysqlConnection.query('SELECT * FROM user WHERE id=?', [id], (err, row, field) => {
//         if (!err) {
//             res.status(200).json(response({ success: true, payload: row }))
//         }
//         else {
//             res.json(response({ success: false, message: err }))
//         }
//     })
// }