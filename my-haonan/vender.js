const express = require('express');
const vender = express.Router();
const VenderDB = require('./venderDB');

vender.post('/add',(req,res)=>{
  VenderDB.AddNewVender(req.body)
    .then((doc) => {
      console.log(doc);
        res.json({ data: doc});
    }).catch( err => {
    console.log("添加失败！",err);
  });
});
//查询厂家
vender.get("/venderList",(req,res)=>{
  VenderDB.findVenderAll().then((doc)=>{
   // console.log(doc);
    res.json({data:doc});
  })
});
//删除厂家
vender.post("/remove",(req,res)=>{
  VenderDB.removeVebder(req.body.id).then((doc)=>{
    console.log(1111);
    console.log(req.body.id);
    console.log(doc);
    res.json({data:doc});
  })
});
//修改厂家
vender.post("/update",(req,res)=>{
  VenderDB.updateVenderById(req.body).then((doc)=>{
    console.log(1111);
    console.log(req.body.id);
    console.log(doc);
    res.json({data:doc});
  })
});
module.exports=vender;
