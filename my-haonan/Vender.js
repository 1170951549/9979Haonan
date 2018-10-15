const express = require('express');
const vender = express.Router();
const VenderDB = require('./VenderDB');

vender.post('/add',(req,res)=>{
  VenderDB.AddNewVender(req.body)
    .then((doc) => {
      console.log(doc);
        res.json({ data: doc});
    }).catch( err => {
   // res.json({err:'-1',msg:'提交失败！',data:''});
    console.log("添加失败！",err);
  });
});
module.exports=vender;
