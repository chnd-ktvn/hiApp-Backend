const router = require('express').Router()
const {
  registerUser,
  loginUser,
  getUserProfile,
  editActivation,
  editLocation,
  editProfileUser,
  sendCodeForgot,
  deletePhotoProfileUser,
  addFriends,
  getListFriends
} = require('../controller/user')
const { auth } = require('../middleware/auth')
const uploadFile = require('../middleware/multerUser')

router.get('/profile/:id', auth, getUserProfile)
router.get('/friends/:id', auth, getListFriends)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/activation', editActivation)
router.patch('/forgotpassword', sendCodeForgot)
router.patch('/editlocation/:id', auth, editLocation)
router.patch('/editprofile/:id', auth, uploadFile, editProfileUser)
router.patch('/deletephoto/:id', auth, deletePhotoProfileUser)
router.post('/addfriend', auth, addFriends)
module.exports = router

// http://localhost:3010/user/register
// http://localhost:3010/user/login
// http://localhost:3010/user/editprofile/:id
// http://localhost:3010/user/profile/:id
// http://localhost:3010/user/friends/:id
// http://localhost:3010/user/addfriend
