'use strict'
const co = require('co');
var GetList = require('../../services/get_list');

exports.getRestaurant = function(req, res, next) {
    GetList.getRestaurant(req.body.attribute, req.body.value, req.body.start, req.body.end)
        .then((resault)=>{
            if(resault) res.send(resault);
            else res.send('server error');
        });
};

exports.getDish = function(req, res, next) {
    GetList.getDish(req.body.attribute, req.body.value, req.body.start, req.body.end)
        .then((resault)=>{
            if(resault) res.send(resault);
            else res.send('server error');
        });
}

exports.getOrder = function(req, res, next) {
    req.cheskBody('id', '验证的账号为空').notEmpty();
    req.cheskBody('password', '验证的密码为空').notEmpty();
    let info = {
        type : req.body.type,
        id : req.body.id,
        password : req.body.password
    }
    GetList.getOrder(info, req.body.start, req.body.end).then((resault)=>{
        return resault;
    })
}