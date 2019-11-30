const express = require('express')

const { postLogin } = require('../controller/loginController')


const router = express.Router()

router.post('/', postLogin)


module.exports = router