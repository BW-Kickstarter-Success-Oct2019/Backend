const express = require('express')
const restricted = require('')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/users/register', (req, res) => {
    
})

router.post('/users/login', (req, res) => {

})

router.get('/users', restricted, (req,res) => {

})

router.delete('/users/update/', restricted, (req, res) => {
    
})

router.delete('/users/delete/', restricted, (req, res) => {

})


module.exports = router