'use strict'

const co = require('co');
const Customer = require('../modules/customer');
const Staff = require('../modules/staff');
const redis = require('redis'); 
const client = redis.createClient({ "host": "127.0.0.1", "port": "6379" });

client.on('error', function (err) { console.log('redis错误 - ' + client.host + ':' + client.port + ' - ' + err);});

exports.signup = co.wrap(function*(accountData) { 
    /*account is a js object with 'password', 'name', 'phone'*/
    let resault = yield Customer.create(accountData);
    if(resault) {
        return 'SUCCESS[ID-'+resault._id+']';
    } else {
        return 'FAIL';
    }
})

exports.customerLogin = co.wrap(function*(info) {
    client.hget(info.id,'password',(err, reply)=>{
        if(err) {
            console.log('redis error!');
        } else if(reply == info.password) {
            return 'SUCCESS'
        }
    });
    let resault1 = yield Customer.findOne({_id:info.id});
    if(typeof(resault1)==='undefined') {
        return 'ID';
    }
    let resault2 = yield Customer.findOne({_id:info.id, password:info.password});
    client.hset(info.id, 'password', info.password);
    client.expire(info.id, 120);
    if(typeof(resault2)==='undefined') {
        return 'PASSWORD';
    }
    return 'SUCCESS';
});

exports.staffLogin = co.wrap(function*(info) {
    client.hget(info.id,'password',(err, reply)=>{
        if(err) {
            console.log('redis error!');
        } else if(reply == info.password) {
            return 'SUCCESS'
        }
    });
    let resault1 = yield Staff.findOne({_id:info.id});
    if(typeof(resault1)==='undefined') {
        return 'ID';
    }
    let resault2 = yield Staff.findOne({_id:info.id, password:info.password});
    client.hset(info.id, 'password', info.password);
    client.expire(info.id, 120);
    if(typeof(resault2)==='undefined') {
        return 'PASSWORD';
    }
    return 'SUCCESS';
});
