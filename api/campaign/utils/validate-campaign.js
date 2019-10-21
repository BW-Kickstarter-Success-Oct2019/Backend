module.exports = (req, res, next) => {
    const campaign = req.body

    if (
        !campaign.campaign_name||
        !campaign.campaign_description||
        !campaign.goal_amount||
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
