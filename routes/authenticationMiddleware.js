const jwt = require('jsonwebtoken')

module.exports.authenticationMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['x-access-token'] || req.headers['authorization']
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, 'forAuthenticationSecurityTokenofburgershop', (err, authData) => {
            if (err) { res.sendStatus(401).json({err}) }
            else {
                next()
            }
        })
    } else {
        res.status(403).json({
            success: false,
            message: 'Authentication Failed.Login again!'
        })
    }
}