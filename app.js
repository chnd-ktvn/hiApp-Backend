const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routesNav = require('./src/routesNavigation')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(morgan('dev'))
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
app.listen(process.env.PORT, () => {
  console.log(`Expresss app is listening on port ${process.env.PORT}`)
})
