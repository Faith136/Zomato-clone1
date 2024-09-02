const Location = require("../Model/locationDB.js")

exports.getLocation = (req, res) => {

    Location.find()
        .then(response => {
            res.status(200).json({
                message: "Locations Fetched Successfully",
                location: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}