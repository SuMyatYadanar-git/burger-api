const dao = require('../dao/productOperation')

module.exports.getAllproduct = (req, res) => { dao.getAllproduct(req, res) }

module.exports.newProduct = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) {
            res.json("ERRor: " + err)
        } else {
            const post = {
                img: req.file === undefined ? '' : req.file.filename,
                name: req.body.name.trim(),
                price: req.body.price.trim(),
                description: req.body.description.trim()
            }
            dao.newProduct(req, res, post)
        }
    })
}

module.exports.updateProduct = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) res.json('upload error::', err)
        else {
            post = {
                id: req.params.id,
                img: req.file === undefined ? '' : req.file.filename,
                name: req.body.name.trim(),
                price: req.body.price.trim(),
                description: req.body.description.trim()
            }
            dao.updateProduct(req, res, post)
        }
    })
}

module.exports.updateDeleteProduct = (req, res) => {
    const post = { id: req.params.id }
    dao.updateDeleteProduct(req, res, post)
}