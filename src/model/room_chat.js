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
  getChat: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat WHERE id_room_gen=?', id,
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
  // SELECT id_room_gen, id_sender, id_receiver, msg, user_name FROM chat JOIN user ON chat.id_receiver=user.user_id WHERE id_receiver=5 AND status=0
  getNotif: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT id_room_gen, id_sender, id_receiver, msg, user_name FROM chat JOIN user ON chat.id_sender=user.user_id WHERE id_receiver=${id} AND status=0`,
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
  },
  // update chat set status = 1 where id_receiver=5
  editStatusMsg: (setData, id, id_receiver) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE chat SET ? WHERE id_room_gen=${id} AND id_receiver=${id_receiver}`, setData, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
