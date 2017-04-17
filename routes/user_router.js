const express = require('express')
const router = express.Router()
const loggedIn = require('./login_status/loggedIn')
const notLoggedIn = require('./login_status/notLoggedIn')
const userController = require('../controllers/users_controller')

router.get('/signup', userController.signupForm)

router.post('/signup', userController.authSignup)

router.get('/login', userController.loginForm)

router.post('/login', userController.authLogin)

router.get('/logout', notLoggedIn, userController.logout)

router.get('/users/:id', notLoggedIn, userController.show)



module.exports = router
