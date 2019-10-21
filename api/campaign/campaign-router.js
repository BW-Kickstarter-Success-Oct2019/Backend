const express = require('express')
const campaignModel = require('./campagin-model')

//middleware
const validateCampaign = require('./utils/validate-campaign')

const router = express.Router()

router.post('/campaigns',validateCampaign,  (req, res) => {
	let newCampaign = req.body
	const id = req.userid

	newCampaign = { userid: id, ...campaign,}
	console.log(campaign)
		campaignModel.add(newCampaign)
			.then(campaign => {
				res.status(201).json(campaign)
			})
})

router.get('/campaigns', (req, res) => {

})

router.put('/campaigns', (req, res) => {

})

router.delete('/campaigns', (req, res) => {

})
module.exports = router