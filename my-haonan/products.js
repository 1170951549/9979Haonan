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
//产品查询
product.get("/productList",(req,res)=>{
  productDB.findProductAll().then((doc)=>{
    //console.log(doc);
    res.json({data:doc});
  })
});
//删除产品
product.post("/remove",(req,res)=>{
  productDB.removeProduct(req.body.id).then((doc)=>{
    console.log(1111);
    console.log(req.body.id);
    console.log(doc);
    res.json({data:doc});
  })
});
//修改产品
product.post("/update",(req,res)=>{
  productDB.updateProductById(req.body).then((doc)=>{
    console.log(1111);
    console.log(req.body.id);
    console.log(doc);
    res.json({data:doc});
  })
});
module.exports=product;
