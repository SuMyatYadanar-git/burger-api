const dao = require('../dao/categoryOperation')

module.exports.getCategory = (req, res) => {
    dao.getCategory(req, res)
}

module.exports.newCategory = (req, res, upload) => {  // do upload here
    // console.log(req.file)
    upload(req, res, (err) => {
        if (err) {
            res.status(209).json("upload err: ", err)
        }

        else {
            const img = req.file.filename
            const name = req.body.c_name
            dao.newCategory(req, res, img, name)
            // dao.editCategory(req,res,img,name)
        }
    });

}

module.exports.editCategory = (req, res, upload) => {
    upload(req, res, (err) => {
        if (err) res.json('upload err::' + err)
        else {
            const id = req.params.id
            const post = {
                // id :req.body.c_id,`
                img: req.file.filename,
                name: req.body.c_name
            }
            dao.editCategory(req, res, post, id)
        }
    })

}

module.exports.deleteCategory = (req, res) => {
    // console.log(req.body)
    const id = req.params.id

    // const id = req.body.info.id
    dao.deleteCategory(req, res, id)
}