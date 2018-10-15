const express = require('express');
const router = express.Router();
const vender =require('./vender');
const product =require('./products');
// const order = require('./order');

router.use('/vender',vender);
// router.use('/order',order);
router.use('/product',product);
router.get('/',(req,res)=>{
  res.send('Sever Start');
});

module.exports = router;
