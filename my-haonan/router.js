const express = require('express');
const router = express.Router();
const vender =require('./Vender');
// const order = require('./order');

router.use('/vender',vender);
// router.use('/order',order);

router.get('/',(req,res)=>{
  res.send('Sever Start');
});

module.exports = router;
