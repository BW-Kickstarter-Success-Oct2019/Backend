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
            "name",
            "blurb",
            "goal",
            "country",	
            "duration",
            "category",
        ]})
    }
    else {
        next()
    }
}
