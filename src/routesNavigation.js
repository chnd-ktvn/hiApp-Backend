const router = require('express').Router()
const user = require('./routes/user')
const room = require('./routes/room_chat')
router.use('/user', user)
router.use('/room', room)
module.exports = router
