function checkRole(role) {
    return (req, res, next) => {
        if (req.userRole === role) {
            next()
        }
    }
}

module.exports = {
    checkRole
}