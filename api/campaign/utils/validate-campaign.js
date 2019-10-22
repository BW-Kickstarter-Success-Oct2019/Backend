module.exports = (req, res, next) => {
    const campaign = req.body

    if (
        !campaign.name||
        !campaign.blurb||
        !campaign.goal||
        !campaign.country||
        !campaign.duration||
        !campaign.category
    ) {
        res.status(400).json({ message: "missing requried fields" , fields: [
            "campaign_name",
            "campaign_description",
            "goal_amount",
            "country",	
            "duration",
            "category",
            "campaign_success"
        ]})
    }
    else {
        next()
    }
}
