const axios = require('axios')


module.exports = (req, res, next) => {
	let newCampaign = req.body
	axios.post('http://196d8cec.ngrok.io/predict', newCampaign)
		.then(res => {
			req.body.success = res.data.pred
			next()
		})
		.catch(err => {
			res.status(500).json({ errMessage: 'could not predict model', err })
		})
}