const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
module.exports = {
  auth: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.ACCESS, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          console.log(error)
          return helper.response(res, 403, error.message)
        } else {
          req.token = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please Login First!')
    }
  }
}
