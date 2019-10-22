const campaignModel = require('../campagin-model');

module.exports = (req, res, next) => {
	const id = req.params.id
	campaignModel.getBy({ id }).first()
		.then(campaign => {
			if(!campaign){
				res.status(404).json({message: "could not find campaign by that id"})
			} else {
				next()
			}
		})
		.catch(err => {
			res.status(500).json({errMessage: "internal database error", err})
		})

}