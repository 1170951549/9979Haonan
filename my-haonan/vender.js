const express = require('express');
const vender = express.Router();
const VenderDB = require('./venderDB');
//修改厂家
vender.post("/update",(req,res)=>{
  VenderDB.updateVenderById(req.body).then((doc)=>{
    // console.log(req.body.name);
    // console.log(req.body.id);
    res.json({data:doc});
  })
});



//添加厂家
vender.post('/add',(req,res)=>{
  VenderDB.AddNewVender(req.body)
    .then((doc) => {
      res.json({ data: doc});
    }).catch( err => {
    console.log("添加失败！",err);
  });
});
//查询厂家
vender.get("/venderList",(req,res)=>{
  VenderDB.findVenderAll().then((doc)=>{
    //console.log(doc.所属产品)
    //console.log(doc);
    res.json({data:doc});
  })
});

//删除厂家
vender.post("/remove",(req,res)=>{
  VenderDB.removeVebder(req.body.id).then((doc)=>{
   // console.log(req.body.id);
    res.json({data:doc});
  })
});

module.exports=vender;
