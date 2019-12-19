const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('profileImage')

const { getAllprofile, NewProfile, deleteProfile,UpdateAllProfile,updateDeleteProfile } = require('../controller/profileController')
const { authenticationMiddleware } = require('./authenticationMiddleware')

// router.use(authenticationMiddleware)

router.get('/', getAllprofile)

router.post('/', authenticationMiddleware,(req, res) => NewProfile(req, res, upload))

router.put('/:id', authenticationMiddleware,(req, res) => UpdateAllProfile(req, res, upload))

router.patch('/delete-profile/:id',authenticationMiddleware,updateDeleteProfile)

module.exports = router