const express = require('express')

const router = express.Router()

const { authenticationMiddleware } = require('./authenticationMiddleware')

const { getLoginData, changePwd, changeUserName } = require('../controller/userController')

router.get('/:id', getLoginData)

router.patch('/change-pwd', authenticationMiddleware,changePwd)

router.put('/change-name', authenticationMiddleware, changeUserName)

module.exports = router