const router = require('express').Router()
const {
  registerUser,
  loginUser
} = require('../controller/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = router
// http://localhost:3010/user/register
// http://localhost:3010/user/login

