const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const moment = require('moment')
require('dotenv').config()
const helper = require('../helper/response')
const {
  registerUser,
  loginUser,
  getUserProfileById,
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
      const checkDataLogin = await loginUser(user_email)
      if (checkDataLogin.length > 0) {
        return helper.response(
          res,
          400,
          'OOPS! Your email has been registered!'
        )
      } else {
        if (user_password.length > 6 && user_password.length < 16) {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(user_password, salt)

          const setData = {
            user_name,
            user_email,
            user_password: encryptPassword,
            user_activation: 'off'
          }
          const resultReg = await registerUser(setData)
          const userId = resultReg.user_id
          if (userId !== null) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              port: 587,
              secure: false,
              auth: {
                user: 'faithrose636@gmail.com',
                pass: 'arkademyfaith'
              }
            })
            // http://localhost:3010/user/activation/${userId}
            const mailOptions = {
              from: '"Hi App"<faithrose636@gmail.com>',
              to: user_email,
              subject: 'Hi App - Activate Your Account',
              html: `<div style="font-family: cursive; font-size: 20px;">
              <h4>Hey, it's nice to see you. I am Faith from Hi App.</h4>

              <p>I am here to send you the access link to Hi App. Please, click <a href="http://localhost:8080/activate/${userId}">this</a> to activate your account. Hope you'll enjoy it.</p>

              <p>Have a great day!</p></div>`
            }
            await transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error)
                return helper.response(res, 400, 'Email not sent!')
              } else {
                console.log(info)
                return helper.response(res, 200, 'Email has been sent!')
              }
            })
            return helper.response(
              res,
              200,
              'Now, you are registered. Please, check your email to activate your account!',
              resultReg
            )
          } else {
            return helper.response(res, 400, 'Failed to Register!')
          }
        } else {
          return helper.response(
            res,
            400,
            'Password must be 7 - 15 characters long!'
          )
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body
      const checkDataLogin = await loginUser(user_email)

      if (checkDataLogin.length > 0) {
        const userIsActive = checkDataLogin[0].user_activation

        if (userIsActive === 'on') {
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
          return helper.response(
            res,
            400,
            "You haven't activated your account yet!"
          )
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
  editActivation: async (req, res) => {
    try {
      const { id } = req.body
      const checkUserId = await getUserProfileById(id)
      if (checkUserId.length > 0) {
        if (checkUserId[0].user_activation === 'off') {
          const setData = {
            user_activation: 'on',
            created_at: moment().format()
          }
          const result = await editProfileUser(setData, id)
          return helper.response(
            res,
            200,
            'Successfully activated your account.',
            result
          )
        } else {
          return helper.response(res, 400, 'Your account is already active.')
        }
      } else {
        return helper.response(res, 404, 'ID Not Found!')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  sendCodeForgot: async (req, res) => {
    try {
      // ada button yang trigger pembuatan random untuk email ini
      // email ada ga
      const { user_email } = req.body // user_id
      const checkDataLogin = await loginUser(user_email)
      console.log(checkDataLogin)
      setInterval(() => {
        console.log('cobaa')
      }, 2000)
      // if (checkDataLogin > 0) {
      //   const setData = {
      //     forgot_code: require('crypto').randomBytes(8).toString('hex')
      //   }
      //   const result = await editProfileUser(setData, user_id)
      //   const userId = resultReg.user_id
      //   if (userId !== null) {
      //     // console.log(userId)
      //     const transporter = nodemailer.createTransport({
      //       service: 'gmail',
      //       port: 587,
      //       secure: false,
      //       auth: {
      //         user: 'faithrose636@gmail.com',
      //         pass: 'arkademyfaith'
      //       }
      //     })
      //     const mailOptions = {
      //       from: '"Hi App"<faithrose636@gmail.com>',
      //       to: user_email,
      //       subject: 'Hi App - Activate Your Account',
      //       html: `<div style="font-family: cursive; font-size: 20px;">
      //         <h4>Hey, it's nice to see you. I am Faith from Hi App.</h4>

      //         <p>I am here to send you the access link to Hi App. Please, click <a href="http://localhost:3010/user/activation/${userId}">this</a> to activate your account. Hope you'll enjoy it.</p>

      //         <p>Have a great day!</p></div>`
      //     }
      //     await transporter.sendMail(mailOptions, function (error, info) {
      //       if (error) {
      //         console.log(error)
      //         return helper.response(res, 400, 'Email not sent!')
      //       } else {
      //         console.log(info)
      //         return helper.response(res, 200, 'Email has been sent!')
      //       }
      //     })
      //     return helper.response(res, 200, 'Success', result)
      //   } else {
      //     return helper.response(res, 404, 'Email is not registered!')
      //   }
      // }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  editPassword: async (req, res) => {
    try {
      // password dan kode randomnya ilang berdasarkan kode random
    } catch (error) {}
  },
  editLocation: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserId = await getUserProfileById(id)
      const { lat, lng } = req.body
      if (checkUserId.length > 0) {
        const setData = {
          lat,
          lng
        }
        const result = await editProfileUser(setData, id)
        return helper.response(
          res,
          200,
          `Success Edit Location User By Id ${id}`,
          result
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
      // const photo = await getPhotoProfile(id)
      const photo = checkUserId[0].user_photo
      if (checkUserId.length > 0) {
        const { user_name, user_phone, user_bio, user_fullname } = req.body
        // setelah ttanda tanya itu photo
        const setData = {
          user_name,
          user_fullname,
          user_phone,
          user_bio,
          user_photo: req.file === undefined ? photo : req.file.filename,
          updated_at: moment().format()
        }
        if (setData.user_photo !== photo) {
          fs.unlink(`./upload/user/${photo}`, function (err) {
            if (err) console.log(err)
            console.log('File deleted!')
          })
        }
        const result = await editProfileUser(setData, id)
        const emailFriend = await getUserProfileById(id)
        console.log(emailFriend[0].user_photo)
        // const emailFriend = await getEmailFriend(user_email)
        const setDataUpdate = {
          friends_with: emailFriend[0].user_id,
          user_name: emailFriend[0].user_name,
          user_bio: emailFriend[0].user_bio,
          user_photo: emailFriend[0].user_photo,
          user_phone: emailFriend[0].user_phone,
          user_email: emailFriend[0].user_email
        }
        await updateListFriends(setDataUpdate, id)
        return helper.response(
          res,
          200,
          'Successfully updated your profile.',
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
      console.log(checkUserId[0].user_photo)
      const photo = checkUserId[0].user_photo
      if (checkUserId.length > 0) {
        const setData = {
          user_photo: '',
          updated_at: moment().format()
        }
        fs.unlink(`./upload/user/${photo}`, function (err) {
          if (err) console.log(err)
          console.log('File deleted!')
        })
        await deletePhotoProfileUser(setData, id)
        delete setData.updated_at
        console.log(setData)
        await updateListFriends(setData, id)
        return helper.response(
          res,
          200,
          'Successfully deleted your profile picture.'
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
              user_email: emailFriend.email,
              created_at: moment().format()
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
            `${user_email} is already existed in your contact list!`
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
