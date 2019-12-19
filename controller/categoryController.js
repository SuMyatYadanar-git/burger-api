const dao = require('../dao/categoryOperation')

module.exports.getCategory = (req, res) =>  dao.getCategory(req, res) 

module.exports.newCategory = (req, res, upload) => {  
    upload(req, res, (err) => {
        if (err) {  res.status(209).json("upload err: ", err) }
        else {
            const img = req.file.filename
            const name = req.body.name.trim()
            dao.newCategory(req, res, img, name)
        }
    });
}

module.exports.editCategory = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) res.json('upload err::' + err)
        else {
            const id = req.params.id
            const post = {
                img: req.file === undefined ? '' : req.file.filename,
                name: req.body.name.trim()
            }
            dao.editCategory(req, res, post, id)
        }
    })
}

module.exports.updateDeleteCategory = (req, res) => {
    const id = req.params.id
    dao.updateDeleteCategory(req, res, id)
}