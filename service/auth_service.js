const jwt = require('jsonwebtoken')
const User = require('../model/user')

module.exports = (req, res, next) => {
    const { token } = req.headers
    if (token) {
        try {
            const result = jwt.verify(token, "secret")  
            next()

        } catch (err) {
            res.statusCode = 401
            res.send()

        }
    } else {
        res.statusCode = 401
        res.send()
    }

}

