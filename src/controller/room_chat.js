const {
  getRoom,
  getChat,
  postRoom,
  postChat
} = require('../model/room_chat')
const moment = require('moment')
const helper = require('../helper/response')

module.exports = {
  getRoom: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getRoom(id)
      return helper.response(res, 200, `Success get room chat for id user ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  getChat: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getChat(id)
      return helper.response(res, 200, `Success get chat for id room ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  postRoom: async (req, res) => {
    try {
      const { sender, receiver } = req.body
      const idGen = require('crypto').randomBytes(8).toString('hex')
      const setDataFirst = {
        id_room_gen: idGen,
        sender,
        receiver,
        created_at: moment().format()
      }
      await postRoom(setDataFirst)
      const setDataSecond = {
        id_room_gen: idGen,
        sender: req.body.receiver,
        receiver: req.body.sender,
        created_at: moment().format()
      }
      const result = await postRoom(setDataSecond)
      return helper.response(
        res,
        200,
        'Success make room chat',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  postChat: async (req, res) => {
    try {
      const { id_room_gen, id_sender, id_receiver, msg } = req.body
      const setData = {
        id_room_gen,
        id_sender,
        id_receiver,
        msg,
        created_at: moment().format()
      }
      const result = await postChat(setData)
      return helper.response(
        res,
        200,
        'Success send chat',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  }
}
