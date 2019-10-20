const express = require('express')

//auth
const bcrypt = require('bcryptjs')
const jwtSecret = require('../utils/secret')

//middleware
// const = require('')
const validateUser = require('../utils/validateUser-middleware')

//dataBase
const usersModel = require('./users-model')

const router = express.Router()

router.post('/users/register', validateUser, (req, res) => {
	const user = req.body

	const hash = bcrypt.hashSync(user.password, 10)
	user.password = hash

	usersModel.add(user)
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(500).json({message: 'could not add user to database', err})
		})

})

router.post('/users/login', (req, res) => {

})

router.get('/users',  (req, res) => {
	usersModel.get()
		.then(users => {
			res.status(200).json(users)
		})

		.catch(err => {
			res.status(500).json({message: 'could not get users', err})
		})
})

router.put('/users/update', validateUser,  (req, res) => {

})

router.delete('/users/delete/:id', (req, res) => {
	const id = req.params.id

	usersModel.remove(id)
		.then(user => {
			if(user){
				res.status(200).json(user)
			} else {
				res.status(400).json({message: "the user with that id does not exsist"})
			}
		})
		.catch(err => {
			res.status(500).json({message: 'could not delete user', err})
		})
})


module.exports = router