const router = require('express').Router()
const {
  getRoom,
  getChat,
  getNotif,
  postRoom,
  postChat,
  editStatusMsg
} = require('../controller/room_chat')
const { auth } = require('../middleware/auth')

router.get('/getchat/:id', auth, getChat)
router.get('/getroom/:id', auth, getRoom)
router.get('/getnotif/:id', auth, getNotif)
router.post('/postRoom', auth, postRoom)
router.post('/postChat', auth, postChat)
// editStatusMsg
router.patch('/changeStatus', auth, editStatusMsg)
module.exports = router
