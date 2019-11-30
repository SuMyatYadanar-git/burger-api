const express = require('express')

const router = express.Router()

const { authenticationMiddleware } = require('./authenticationMiddleware')

const { getLoginData, changePwd, changeUserName } = require('../controller/userController')

router.get('/:id', getLoginData)

router.patch('/change-pwd', changePwd)

router.patch('/change-name',  changeUserName)

module.exports = router