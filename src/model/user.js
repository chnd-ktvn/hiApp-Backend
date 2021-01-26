const connection = require('../config/mysql')
module.exports = {
  registerUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  loginUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, user_name, user_email, user_password FROM user WHERE user_email=?', email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getUserProfileById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user WHERE user_id=${id}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  getPhotoProfile: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT user_photo AS photo FROM user WHERE user_id=${id}`, (error, result) => {
        if (!error) {
          resolve(result[0].photo)
        } else {
          reject(error)
        }
      })
    })
  },
  editLocation: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE user SET ? WHERE user_id=${id}`, setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: id, ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  editProfileUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE user SET ? WHERE user_id=${id}`, setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: id, ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deletePhotoProfileUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE user SET ? WHERE user_id=${id}`, setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: id, ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getEmailFriend: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id AS id, user_name AS username,  user_email AS email, user_bio AS bio, user_photo AS photo FROM user WHERE user_email= ?', email, (error, result) => {
        if (!error) {
          const newResult = {}
          newResult.id = result[0].id
          newResult.username = result[0].username
          newResult.email = result[0].email
          newResult.bio = result[0].bio
          newResult.photo = result[0].photo
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getEmailUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT user_email AS email FROM user WHERE user_id=${id}`, (error, result) => {
        if (!error) {
          resolve(result[0].email)
        } else {
          reject(error)
        }
      })
    })
  },
  addListFriends: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO friends SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateListFriends: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE friends SET ? WHERE friends_with = ${id}`, setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  // SELECT * FROM friends WHERE user_id = 8 AND user_email = 'chandra@gmail.com'
  checkListFriends: (id, email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT user_email FROM friends WHERE user_id = ${id} AND user_email = ?`, email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  // SELECT * FROM friends WHERE user_id = 8
  getListFriends: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM friends WHERE user_id = ${id}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}
