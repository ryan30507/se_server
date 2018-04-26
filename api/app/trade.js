'use strict'
const co = require('co');
const Trade = require('../../services/trade');


exports.makeOrder = function(req, res, next) {
    req.checkBody('id', '验证出错').notEmpty();
    req.checkBody('password', '验证出错').notEmpty();
    req.checkBody('DishID', '未选择菜品').notEmpty();
    req.checkBody('toAddr', '未选择配送地址').notEmpty();
    Trade.makeOrder(req.body.id, req.body.password, req.body.DishID, req.body.toAddr)
        .then((resault)=>{
            res.send(resault);
        });
};

exports.token = function(req, res, next) {
    req.checkBody('id', '验证出错').notEmpty();
    req.checkBody('password', '验证出错').notEmpty();
    Trade.token(req.body.id, req.body.password).then((resault)=>{
        res.send(resault);
    })
};

exports.verify = function(req, res, next) {
    req.checkBody('id', '验证出错').notEmpty();
    req.checkBody('password', '验证出错').notEmpty();
    req.checkBody('token', '未提交令牌').notEmpty();
    req.checkBody('order', '订单ID缺失').notEmpty();
    Trade.verify(req.body.id, req.body.password, req.body.token, req.body.order).then((resault)=>{
        res.send(resault);
    })
}