const dao = require('../dao/profileOperation')

module.exports.getAllprofile = (req, res) =>  dao.getAllprofile(req, res)

module.exports.NewProfile = (req, res, upload) => {
    upload(req, res, err => {
        if (err) res.json("upload err: ", err);
        else {
            const post = {
                address: req.body.address.trim(),
                name: req.body.name.trim(),
                img: req.file.filename,
                mail: req.body.mail.trim(),
                phone: req.body.phone.trim()
            }
            dao.NewProfile(req, res, post)
        }
    })
}

module.exports.UpdateAllProfile = (req, res, upload) => {
    upload(req, res, err => {
        if (err) { res.json('upload err::', err) }
        else {
            const post = {
                id: req.params.id,
                address: req.body.address.trim(),
                name: req.body.name.trim(),
                img: req.file === undefined ? '' : req.file.filename,
                mail: req.body.mail.trim(),
                phone: req.body.phone.trim()
            }
            dao.UpdateAllProfile(req, res, post)
        }
    })
}

module.exports.updateDeleteProfile = (req, res) => {
    const id = req.params.id
    dao.updateDeleteProfile(req, res, id)
}