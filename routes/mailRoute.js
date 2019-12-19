const express = require('express')

const { postMail } = require('../controller/mailController')

const router = express.Router()

router.post('/', postMail)

module.exports = router