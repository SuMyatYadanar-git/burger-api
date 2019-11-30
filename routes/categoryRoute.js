const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
        // console.log(new Date().toISOString())
        callback(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('categoryImage')

const router = express.Router()

const { getCategory, newCategory, editCategory, deleteCategory } = require('../controller/categoryController')
const {authenticationMiddleware} = require('./authenticationMiddleware')

//  router.use(authenticationMiddleware)

//get=> http:localhost:5000/api/admin/category
router.get('/',getCategory)

//post=> http:localhost:5000/api/admin/category
router.post('/',(req, res)=>newCategory(req, res, upload))

//patch=> http:localhost:5000/api/admin/category/id
router.put('/:id',authenticationMiddleware,(req,res)=>editCategory(req,res,upload))
//  router.patch('/:id', upload.single('categoryImage'), editCategory)

// delete => http://localhost:5000/api/admin/category
router.delete('/:id',authenticationMiddleware,deleteCategory)

module.exports = router