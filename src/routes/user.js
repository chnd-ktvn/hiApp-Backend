const router = require('express').Router()
const {
  registerUser,
  loginUser,
  getUserProfile,
  editLocation,
  editProfileUser,
  deletePhotoProfileUser,
  addFriends,
  getListFriends
} = require('../controller/user')
// const { auth } = require('../middleware/auth')
const uploadFile = require('../middleware/multerUser')

router.get('/profile/:id', getUserProfile)
router.get('/friends/:id', getListFriends)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/editlocation/:id', editLocation)
router.patch('/editprofile/:id', uploadFile, editProfileUser)
router.patch('/deletephoto/:id', deletePhotoProfileUser)
router.post('/addfriend', addFriends)
module.exports = router

// http://localhost:3010/user/register
// http://localhost:3010/user/login
// http://localhost:3010/user/editprofile/:id
// http://localhost:3010/user/profile/:id
// http://localhost:3010/user/friends/:id
// http://localhost:3010/user/addfriend
