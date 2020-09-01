var express = require('express');
var router = express.Router();

// // CONTROLADORES
const cartController = require('../controllers/cartController')
const userMiddleware = require('../​middlewares​/userMiddleware');

// router.get('/', indexController.root);


router.get('/', cartController.root);
router.post('/pay', userMiddleware, cartController.pay);


module.exports = router;
