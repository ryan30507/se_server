'use strict'

const co = require('co');
const Customer = require('../modules/customer');
const Staff = require('../modules/staff');
const Order = require('../modules/order');

function rndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

exports.makeOrder = co.wrap(function*(id, password, DishID, toAddr) {
    let cusInfo = Customer.findOne({_id:id, password:password});
    if(typeof(cusInfo) === null) {
        return 'USER_INFO';
    } else {
        yield staffInfo = Staff.findOne({orderCount:{$lt:10}});  //寻找目前手上订单少于十个的配送员
        Staff.update({_id:staffInfo._id}, {$set:{orderCuont:staffInfo.orderCount+1}});
        yield resault = Order.create({DishID:DishID, 
                CusID:cusInfo._id,
                CusName:cusInfo.name,
                CusTel:cusInfo.phone,
                StaffID:staffInfo._id,
                StaffName:staffInfo.name,
                StaffTel:staffInfo.phone,
                ToAddr:toAddr,
                OrderTime:Date(),
            });
        return resault._id;
    }
});

exports.token = co.wrap(function*(id, password) {
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
        let order = Order.findOne({CusID:info.id});
        client.hget(order._id+':token', 'token', (err, reply)=>{
            if(err) {
                console.log('redis error!');
            } else if(typeof(reply)!=='undefined') {
                return reply;
            }
        });
        time = Date().getTime();
        let token = rndNum(32) + ' ' + time;
        client.hset(order._id+':token', 'token', token);
        client.expire(order._id+':token', 60);
    } else return 'USER_INFO';
});

exports.verify = co.wrap(function*(id, password, token, orderID) {
    yield client.hget(id,'password',(err, reply)=>{
        if(err) {
            console.log('redis error!');
        } else if(reply == info.password) {
            idCheck = true;
        } else {
            idCheck = Staff.findOne({_id:id, password:password});
        }
    });
    if(idCheck) {
        client.hset(id, 'password', password);
        client.expire(id, 120);
        yield client.hget(orderID+':token', 'token', (err, reply)=>{
            if(err) {
                console.log('redis error!');
            } else if(typeof(reply)!=='undefined') {
                resault = Order.update({_id:orderId}, {$set:{IsDelivered:true, DeliveredTime:Date()}});
                if(resault) return 'FINISH';
            } else {
                return 'FAIL';
            }
        });
    } else return 'USER_INFO';
});