const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const { registerUser, loginUser } = require('../model/user')

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const checkDataLogin = await loginUser(user_email)
      if (checkDataLogin.length > 0) {
        return helper.response(
          res,
          400,
          'OOPS! Your email has been registered!'
        )
      } else {
        const setData = {
          user_name,
          user_email,
          user_password: encryptPassword,
          created_at: new Date()
        }
        const result = await registerUser(setData)
        return helper.response(res, 200, 'Success register!', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Failed register!', error)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body
      const checkDataLogin = await loginUser(user_email)
      if (checkDataLogin.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataLogin[0].user_password
        )
        if (checkPassword) {
          const { user_id, user_name, user_email } = checkDataLogin[0]
          const payload = {
            user_id,
            user_name,
            user_email
          }
          const token = jwt.sign(payload, process.env.ACCESS, {
            expiresIn: '6h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success Login!', result)
        } else {
          return helper.response(res, 400, 'Wrong Password!')
        }
      } else {
        return helper.response(res, 400, "OOPS! You haven't registered yet!")
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  }
}
