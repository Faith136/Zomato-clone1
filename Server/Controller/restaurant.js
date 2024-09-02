const Restaurant = require("../Model/restaurantDB.js")

exports.getRestaurant = (req, res) => {

    Restaurant.find()
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.getRestaurantByLocationId = (req, res) => {

    const { locId } = req.params;

    Restaurant.find({ city: locId }, {})
        .then(response => {
            res.status(200).json({
                message: "Restaurant By Location Id Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.getRestaurantById = (req, res) => {

    const { id } = req.params;

    Restaurant.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Restaurant By Id Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.filteredRestaurant = (req, res) => {
    let { location, mealtype, lcost, hcost, page, sort } = req.body;
    sort = sort ? sort : 1;
    page = page ? page : 1; //if no page is specified, by defaultd page 1 wiil be selected.

    const Itemsperpage = 2; //Number of restaurants in a page.
    const startIndex = page * Itemsperpage - Itemsperpage;
    const endIndex = page * Itemsperpage;

    var filterObj = {};


    location && (filterObj["city"] = location); //inserting a location data from the body to the filter object
    mealtype && (filterObj["type"] = mealtype); // same to mealtype
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost }); //inserting a range to identify the cost of a restaurant given from the body to the filter object.
    //$gte means greater than or equal to.
    //$lte means lower than or equal to


    Restaurant.find(filterObj).sort({ cost: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurant filter Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}