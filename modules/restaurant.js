'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema ({
    name :        {type : String, required : true},
    addr :        {type : String},
    tel :         {type : String},
    level :       {type : Number},
    type :        {type : String},
    Discription : {type : String}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);