const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routesNav = require('./src/routesNavigation')
const cors = require('cors')
require('dotenv').config()
const socket = require('socket.io')

const app = express()
app.use(morgan('dev'))
// app.use(express.static('upload/user'))
app.use(express.static('upload/user'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  response.header('Access-Control-Allow-Headers', 'Content-Type'); next()
})
app.use('/', routesNav)

app.get('*', (request, response) => {
  response.status(404).send('Path Not Found!')
})

// ==================
const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('Connect to socket.io')

  socket.on('joinRoom', (data) => {
    socket.join(data.id_room_gen)
  })
  socket.on('changeRoom', (data) => {
    socket.leave(data.oldRoom)
    socket.join(data.id_room_gen)
  })
  socket.on('roomMessage', (data) => {
    // console.log(data)
    io.to(data.id_room_gen).emit('chatMessage', data)
  })
  socket.on('notif', (notif) => {
    // console.log(notif[0])
    io.emit('notifs', notif[0])
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Expresss app is listening on port ${process.env.PORT}`)
})
