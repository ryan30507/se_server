'use strict'

const co = require('co');
const Dish = require('../modules/dish');
const Restaurant = require('../modules/restaurant');
const Customer = require('../modules/customer');
const Staff = require('../modules/staff');
const Order = require('../modules/order');

exports.getRestaurant = co.wrap(function*(attribute, value, start, end) {
    if(value == '__DECRE') {
        var order = -1;
    } else {
        var order = 1;
    }
    yield resault = Restaurant.find({}, null, {sort:{attribute:order}, skip:start, limit:end-start});
    if(resault) {
        return resault;
    }else {
        return -1;
    }
});

exports.getDish = co.wrap(function*(attribute, value, start, end) {
    yield resault = Dish.find({ResId:value}, null, {skip:start, limit:end-start});
    if(resault) {
        return resault;
    }else {
        return -1;
    }
});

exports.getOrder = co.wrap(function*(info, start, end) {
    if(info.type == 'customer') {
        yield client.hget(info.id,'password',(err, reply)=>{
            if(err) {
                console.log('redis error!');
            } else if(reply == info.password) {
                idCheck = true;
            } else {
                idCheck = Customer.findOne({_id:info.id, password:info.password});
            }
        });
        if(idCheck) {
            client.hset(info.id, 'password', info.password);
            client.expire(info.id, 120);
            yield resault = Order.find({CusId:info.id}, null, {skip:start, limit:end-start});
            if(resault) {
                return resault;
            } else {
                return 'no_order';
            }
        } else return 'USER_INFO';
    } else if(info.type == 'staff') {
        yield client.hget(info.id,'password',(err, reply)=>{
            if(err) {
                console.log('redis error!');
            } else if(reply == info.password) {
                idCheck = true;
            } else {
                idCheck = Staff.findOne({_id:info.id, password:info.password});
            }
        });
        if(idCheck) {
            client.hset(info.id, 'password', info.password);
            client.expire(info.id, 120);
            yield resault = Order.find({StaffId:info.id}, null, {skip:start, limit:end-start});
            if(resault) {
                return resault;
            } else {
                return 'no_order';
            }
        } else return 'USER_INFO';
    }
});