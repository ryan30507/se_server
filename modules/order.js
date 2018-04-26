'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
    DishID :        {type : String, required : true},
    CusID :         {type : String, required : true},
    CusName :       {type : String, required : true},
    CusTel :        {type : String, required : true},
    StaffID :       {type : Number, required : true},
    StaffName :     {type : String, required : true},
    StaffTel :      {type : String, required : true},
    ToAddr :        {type : String, required : true},
    OrderTime :     {type : Date, required : true},
    isDelivered :   {type : Boolean, default : false},
    DeliveredTime : {type : Date}
});

module.exports = mongoose.model('Order', OrderSchema);