'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema ({
    ResID :     {type : Number, required : true},
    name :      {type : String, required : true},
    price:      {type : String, required : true},
    description:{type : String, default : "这个菜品还没有描述，要不先点来尝尝？"}
});

module.exports = mongoose.model('Dish', DishSchema);