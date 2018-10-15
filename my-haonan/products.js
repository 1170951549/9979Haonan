const express = require('express');
const product = express.Router();
const productDB = require('./venderDB');


product.post('/add',(req,res)=>{
  productDB.updateProduct(req.body)
    .then((doc) => {
      console.log(doc);
      res.json({ data: doc});
    }).catch( err => {
    console.log("添加失败",err);
  });
});
product.get("/list",(req,res)=>{
  productDB.findVenderNameAll().then((doc)=>{
    console.log(doc);
    var tempJson=[];
    for(var i=0;i<doc.length;i++){
      tempJson.push({公司名称:doc[i].公司名称});
    }
    res.json({data:tempJson});
  })
});
module.exports=product;
