const dao = require('../dao/productOperation')

module.exports.getAllproduct = (req, res) => {
    dao.getAllproduct(req, res)
}

module.exports.newProduct = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) {
            res.json("ERRor: " + err)
        } else {
            // const img= req.file.filename
            const post = {
                img: req.file.filename,
                name: req.body.p_name,
                price: req.body.p_price,
                description: req.body.description
            }
            dao.newProduct(req, res, post)
        }
    })

}

module.exports.deleteProduct = (req, res) => {
    const post = {
        id: req.params.id
    }
    dao.deleteProduct(req, res, post)
}