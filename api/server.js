//imports
const express = require('express');
const helmet = require('helmet')
const cors = require('cors')

//route imports


//initiate server
const server = express()


//global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

//routes


module.exports = server