const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function registerUser(req, res) {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            res.status(400).render('error',{message:"Такой пользователь существует"})
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword })
        await user.save()
        res.redirect('/login')
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).render('error', { message: 'Server error' })
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).render('error', { message: 'Invalid username or password' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).render('error', { message: 'Invalid username or password' })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey')
        res.cookie('token', token)
        if (user.role === 'admin') {
            return res.redirect('/requests')
        } else {
            return res.redirect('/requests/my')
        }
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).render('error', { message: 'Server error' })
    }
}

function logoutUser(req, res) {
    res.clearCookie('token')
    res.redirect('/login')
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}