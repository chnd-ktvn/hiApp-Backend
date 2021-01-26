const router = require('express').Router()
const {
  getRoom,
  postRoom,
  postChat
} = require('../controller/room_chat')
// const { auth } = require('../middleware/auth')

router.get('/getroom/:id', getRoom)
router.post('/postRoom', postRoom)
router.post('/postChat', postChat)
// /room/postRoom
module.exports = router
