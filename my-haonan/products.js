const express = require('express');
const product = express.Router();
const productDB = require('./venderDB');

//产品查询
product.get("/productList",(req,res)=>{
  productDB.findProductAll().then((doc)=>{
    var item=[];
    var items=[];
    for(var i=0;i<doc.length;i++){
      item.push({"公司名称":doc[i].公司名称,"所属产品":doc[i].所属产品});
      for(var j=0;j<item[i].所属产品.length;j++){
        items.push({"公司名称":doc[i].公司名称,"所属产品":item[i].所属产品[j]})
      }
    }
    //console.log(items);
    res.json({data:items});
  })
});

//关联地区
product.post("/proListSelect",(req,res)=>{
  productDB.findProAllSelect(req.body.公司名称).then((doc)=>{
    var item=[];
    var items=[];
    for(var i=0;i<doc.length;i++){
      item.push({"公司名称":doc[i].公司名称,"所属产品":doc[i].所属产品});
      for(var j=0;j<item[i].所属产品.length;j++){
        items.push({"公司名称":doc[i].公司名称,"所属产品":item[i].所属产品[j]})
      }
    }
    //console.log(items);
    res.json({data:items});
  })
});
//删除产品
product.post("/remove",(req,res)=>{
  productDB.removeProduct(req.body.id, req.body.公司名称).then((doc)=>{
    res.json({data:doc});
  })
});
//修改产品
product.post("/update",(req,res)=>{
  //console.log(req.body);
  productDB.updateProductById(req.body).then((doc)=>{
    //console.log(req.body);
    // console.log(req.body.id);
    res.json({data:doc});
  })
});






//添加产品
product.post('/add',(req,res)=>{
  productDB.updateProduct(req.body)
    .then((doc) => {
      //console.log(doc);
      res.json({ data: doc});
    }).catch( err => {
    console.log("添加失败",err);
  });
});

//查询公司名称 数据绑定
product.get("/list",(req,res)=>{
  productDB.findVenderAll().then((doc)=>{
    //console.log(doc);
    // var tempJson=[];
    // for(var i=0;i<doc.length;i++){
    //   tempJson.push({公司名称:doc[i].公司名称});
    // }
     res.json({data:doc});
  })
});





module.exports=product;
