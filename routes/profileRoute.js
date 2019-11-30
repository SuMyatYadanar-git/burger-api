const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
        // console.log(new Date().toISOString())
        callback(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('profileImage')

const { getAllprofile, NewProfile,deleteProfile } = require('../controller/profileController')
const { authenticationMiddleware } = require('./authenticationMiddleware')

// router.use(authenticationMiddleware)

router.get('/', getAllprofile)

router.post('/',authenticationMiddleware, (req, res) => NewProfile(req, res, upload))

router.delete('/:id',deleteProfile)

module.exports = router