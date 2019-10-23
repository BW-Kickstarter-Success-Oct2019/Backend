const express = require('express');
const campaignModel = require('./campagin-model');


//middleware
const validateFields = require('./utils/validate-campaign-fields');
const getPrediction = require('./utils/getPrediction-middleware');
const validateId = require('./utils/validate-campaign-id')

const router = express.Router();

router.post('/campaigns', validateFields, getPrediction, async (req, res) => {
	let newCampaign = req.body;
	const id = req.userid;
	newCampaign = { user_id: id, ...newCampaign, };

	const addedCampaign = await campaignModel.add(newCampaign)
		try {
			res.status(201).json(addedCampaign);
		} 

		catch (error) {
			res.status(500).json({ errMessage: "internal database error", error });
		}
});

router.get('/campaigns', (req, res) => {
	const user_id = req.userid
	campaignModel.getBy({ user_id })
		.then(campaigns => {
				res.status(200).json(campaigns);
		})

		.catch(err => {
			res.status(500).json({ errMessage: "internal database error", err });
		})
});

router.get('/campaigns/:id', (req, res) => {
	const id = req.params.id
	campaignModel.getBy({ id }).first()
		.then(campaign => {
				res.status(200).json(campaign);
		})

		.catch(err => {
			res.status(500).json({ errMessage: "internal database error", err });
		})
});


router.put('/campaigns/:id', validateId, validateFields, getPrediction, (req, res) => {
	const updatedCampaign = req.body;
	const id = req.params.id;

	 campaignModel.update(id, updatedCampaign)
	 	.then(dbRes => {
			campaignModel.getBy( {id} ).first()
				.then(campaign => {
					res.status(200).json(campaign);
				})

				.catch(err => {
					res.status(500).json(err)
				})
		 })

		.catch(err => {
		res.status(500).json({ errMessage: "internal database error, could not update campaign", err });
		})
});

router.delete('/campaigns/:id', validateId, (req, res) => {
	
	campaignModel.remove(req.params.id)
		.then(campaign => {
			res.status(200).json(campaign)
		})

		.catch(err => {
			res.status(500).json({errMessage: "internal database error, could not update campaign", err })
		})
});
module.exports = router;