const express = require('express')
const campaignModel = require('./campagin-model')


//middleware
const validateCampaign = require('./utils/validate-campaign')
const getPrediction = require('./utils/getPrediction-middleware')

const router = express.Router()

router.post('/campaigns', validateCampaign, getPrediction, async (req, res) => {
	let newCampaign = req.body
	const id = req.userid
	newCampaign = { user_id: id, ...newCampaign, }

	const addedCampaign = await campaignModel.add(newCampaign)
		try {
			res.status(201).json(addedCampaign)
		} 
		catch (error) {
			res.status(500).json({ errMessage: "internal database error", error })
		}
})

router.get('/campaigns', (req, res) => {
	const user_id = req.userid
	campaignModel.getBy({ user_id })
		.then(campaigns => {
				res.status(200).json(campaigns)
		})
		.catch(err => {
			res.status(500).json({ errMessage: "internal database error", err })
		})
})

router.put('/campaigns/:id', validateCampaign, getPrediction, (req, res) => {
	const updatedCampaign = req.body

	 campaignModel.update(req.params.id, updatedCampaign) 
	 	.then(campaign => {
			res.status(200).json(campaign)
		 })

		.catch(err => {
		res.status(500).json({ errMessage: "internal database error could not update campaign", err })
		})


})

router.delete('/campaigns/id:', (req, res) => {

})
module.exports = router