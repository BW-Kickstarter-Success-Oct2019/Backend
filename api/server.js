//imports
const express = require('express');
const helmet = require('helmet')
const cors = require('cors')

//route imports
const usersRouter = require('./auth/users/users-router')
const campaignRouter = require('./campaign/campaign-router')


//initiate server
const server = express()


//global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

//routes
server.use('/api', usersRouter)
// server.use('/api', campaignRouter)


module.exports = server