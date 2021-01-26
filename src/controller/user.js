const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const {
  registerUser,
  loginUser,
  getPhotoProfile,
  getUserProfileById,
  editLocation,
  editProfileUser,
  deletePhotoProfileUser,
  getEmailFriend,
  getEmailUser,
  addListFriends,
  updateListFriends,
  checkListFriends,
  getListFriends
} = require('../model/user')
const fs = require('fs')

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password } = req.body
      if (user_password.length > 6 && user_password.length < 16) {
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
      } else {
        return helper.response(
          res,
          400,
          'Password must be 7 - 15 characters long!'
        )
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
          return helper.response(
            res,
            200,
            `Welcome back, ${user_name}!`,
            result
          )
        } else {
          return helper.response(res, 400, 'Wrong Password!')
        }
      } else {
        return helper.response(res, 400, "OOPS! You haven't registered yet!")
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getUserProfileById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success Get Profile User By Id User ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Id User ${id} is Not Found!`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  editLocation: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserId = await getUserProfileById(id)
      let { lat, lng } = req.body
      lat = parseInt(lat)
      lng = parseInt(lng)
      if (checkUserId.length > 0) {
        const setData = {
          lat,
          lng
        }
        const result = await editLocation(setData, id)
        return helper.response(
          res,
          200,
          `Success Edit Location User By Id ${id}`, result
        )
      } else {
        return helper.response(res, 404, 'ID Not Found!')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  editProfileUser: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserId = await getUserProfileById(id)
      const photo = await getPhotoProfile(id)
      if (checkUserId.length > 0) {
        const {
          user_name,
          user_phone,
          user_bio,
          user_email,
          user_fullname
        } = req.body
        // setelah ttanda tanya itu photo
        const setData = {
          user_name,
          user_fullname,
          user_phone,
          user_bio,
          user_photo: req.file === undefined ? photo : req.file.filename,
          updated_at: new Date(),
          user_email
        }
        if (setData.user_photo !== photo) {
          fs.unlink(`./upload/user/${photo}`, function (err) {
            if (err) console.log(err)
            console.log('File deleted!')
          })
        }
        const result = await editProfileUser(setData, id)
        const emailFriend = await getEmailFriend(user_email)
        const setDataUpdate = {
          friends_with: emailFriend.id,
          user_name: emailFriend.username,
          user_bio: emailFriend.bio,
          user_photo: emailFriend.photo,
          user_email: emailFriend.email
        }
        await updateListFriends(setDataUpdate, id)
        return helper.response(
          res,
          200,
          `Success Update Profile User By Id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, 'ID Not Found!')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  deletePhotoProfileUser: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserId = await getUserProfileById(id)
      const photo = await getPhotoProfile(id)
      const { user_email } = req.body
      if (checkUserId.length > 0) {
        const setData = {
          user_photo: '',
          user_email
        }
        fs.unlink(`./upload/user/${photo}`, function (err) {
          if (err) console.log(err)
          console.log('File deleted!')
        })
        await deletePhotoProfileUser(setData, id)
        const emailFriend = await getEmailFriend(user_email)
        const setDataUpdate = {
          user_photo: emailFriend.photo
        }
        await updateListFriends(setDataUpdate, id)
        return helper.response(
          res,
          200,
          `Success Delete Photo Profile User By Id ${id}`
        )
      } else {
        return helper.response(res, 404, 'ID Not Found!')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  addFriends: async (req, res) => {
    try {
      const { user_email, user_id } = req.body
      const email = await getEmailUser(user_id)
      if (user_email !== email) {
        // NGECEK DIRI SENDIRI
        const checkFriend = await checkListFriends(user_id, user_email)
        if (checkFriend.length < 1) {
          // SUDAH BERTEMAN
          const checkDataFriend = await loginUser(user_email)
          if (checkDataFriend.length > 0) {
            // ngecek email
            const emailFriend = await getEmailFriend(user_email)
            const setData = {
              user_id: user_id,
              friends_with: emailFriend.id,
              user_name: emailFriend.username,
              user_bio: emailFriend.bio,
              user_photo: emailFriend.photo,
              user_email: emailFriend.email
            }
            const result = await addListFriends(setData)
            return helper.response(
              res,
              200,
              `Success add ${setData.user_name} to your contact list!`,
              result
            )
          } else {
            return helper.response(
              res,
              404,
              `OOPS! ${user_email} is not existed!`
            )
          }
        } else {
          return helper.response(
            res,
            400,
            `${user_email} already existed in your contact list!`
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'You cannot add yourself to your contact list!'
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getListFriends: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getListFriends(id)
      const checkUserId = await getUserProfileById(id)
      if (checkUserId.length > 0) {
        if (result.length > 0) {
          return helper.response(
            res,
            200,
            `Success Get List Friends User Id ${id}`,
            result
          )
        } else {
          return helper.response(
            res,
            404,
            "You haven't added a friend to your list!"
          )
        }
      } else {
        return helper.response(res, 404, `Id User ${id} is Not Found!`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  }
}
