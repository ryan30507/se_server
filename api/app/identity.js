'use strict'
const co = require('co');
var Identity = require('../../services/identity');

exports.signup = function(req, res, next) {
    req.checkBody('phone', '电话包含非法字符或为空').notEmpty().isInt();
    req.checkBody('name', '名字为空').notEmpty();
    req.checkBody('password', '密码为空').notEmpty();
    let accountData = {
        password:req.body.password,
        name:req.body.name,
        phone:req.body.phone
    }
    Identity.signup(accountData).then((resault)=>{
        res.send(resault);
    });
};

exports.login = function(req, res, next) {
    let info = {
        id : req.body.id,
        password : req.body.password
    }
    if(req.body.type == 'customer') {
        console.log('here');
        Identity.customerLogin(info).then((resault)=>{
            res.send(resault);
        });
    }else if(req.body.type == 'staff') {
        Identity.staffLogin(info).then((resault)=>{
            res.send(resault);
        });
    }
};