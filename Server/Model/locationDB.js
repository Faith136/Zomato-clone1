const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sample', locationSchema, 'location')

//theres no json data file in this project we export it from mongo schema db called location. The json data ia manually
//added to the mongodb schema so as it can be exported by calling functions