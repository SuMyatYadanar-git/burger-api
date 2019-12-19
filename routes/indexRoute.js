const express = require('express')
const router = express.Router()

const loginRoute = require('./loginRoute')
const categoryRoute = require('./categoryRoute')
const productRoute = require('./productRoute')
const profileRoute = require('./profileRoute')
const userRoute = require('./userRoute')
const mailRoute = require('./mailRoute')

router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/category', categoryRoute)
router.use('/product', productRoute)
router.use('/profile', profileRoute)
router.use('/mail', mailRoute)

module.exports = router