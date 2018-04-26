'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema ({
    password : {type : String, required : true},
    name :     {type : String, required : true},
    phone:     {type : String, required : true},
    orderCount:{type : Number, default : 0}
});

module.exports = mongoose.model('Staff', StaffSchema);