const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/', (req, res) => {res.render('index')})
router.get('/register', (req, res) => {res.render('register')})
router.get('/login', (req, res) => {res.render('login')})
router.get('/error', (req, res) => {res.render('error')})

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

router.get('/logout', userController.logoutUser)

module.exports = router