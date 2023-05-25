const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const token = req.cookies.token
    if (token == null) {
        return res.redirect('/login')
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.redirect('/login')
        }

        req.userId = user.id
        req.userRole = user.role
        next()
    })
}


module.exports = {
    authenticateToken
}