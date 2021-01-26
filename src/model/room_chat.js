const connection = require('../config/mysql')
module.exports = {
  getRoom: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT id_room, id_room_gen, sender, receiver, user_name, user_bio, user_photo, user_email, user_fullname FROM room_chat JOIN user ON room_chat.receiver=user.user_id WHERE sender=${id}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  postRoom: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room_chat SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            room_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  postChat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id_chat: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
