const express = require('express')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('productImage')

const router = express.Router()

const { getAllproduct, newProduct, deleteProduct } = require('../controller/productController')
const { authenticationMiddleware } = require('./authenticationMiddleware')

//  router.use(authenticationMiddleware)

router.get('/', getAllproduct)

router.post('/', authenticationMiddleware, (req, res) => newProduct(req, res, upload))

router.delete('/:id',  deleteProduct)
// router.post('/', (req, res)=>newCategory(req, res, upload))

module.exports = router