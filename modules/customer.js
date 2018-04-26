'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema ({
    password : {type : String, required : true},
    name :     {type : String, required : true},
    phone:     {type : String, required : true}
});

module.exports = mongoose.model('Customer', CustomerSchema);