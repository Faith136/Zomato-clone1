const Mealtype = require("../Model/mealtypeDB.js")

exports.getMealtype = (req, res) => {

    Mealtype.find()
        .then(response => {
            res.status(200).json({
                message: "Meal types Fetched Successfully",
                meal: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.getMealtypeById = (req, res) => {

    const { mealId } = req.params;

    Mealtype.findById(mealId)
        .then(response => {
            res.status(200).json({
                message: "Meal By Id Fetched Successfully",
                mealtype: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}