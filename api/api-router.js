const express = require('express');
const router = express.Router();
const identity = require('./app/identity');
const get_list = require('./app/get_list');
const trade = require('./app/trade');


router.post('/signup', identity.signup);
router.post('/login', identity.login);
router.post('/restaurant', get_list.getRestaurant);
router.post('/dish', get_list.getDish);
router.post('/query_order', get_list.getOrder);
router.post('/make_order', trade.makeOrder);
router.post('/token', trade.token);
router.post('/verify', trade.verify);

module.exports = router;
