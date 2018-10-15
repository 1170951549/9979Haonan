const express = require('express');
const product = express.Router();
const productDB = require('./productDB');

product.post('/add',(req,res)=>{
  productDB.AddNewProduct(req.body)
    .then((doc) => {
      console.log(doc);
      res.json({ data: doc});
    }).catch( err => {
    console.log("添加成功",err);
  });
});
module.exports=product;
