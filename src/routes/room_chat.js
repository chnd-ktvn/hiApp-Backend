const router = require('express').Router()
const {
  getRoom,
  getChat,
  postRoom,
  postChat
} = require('../controller/room_chat')
const { auth } = require('../middleware/auth')

router.get('/getchat/:id', auth, getChat)
router.get('/getroom/:id', auth, getRoom)
router.post('/postRoom', auth, postRoom)
router.post('/postChat', auth, postChat)
module.exports = router
