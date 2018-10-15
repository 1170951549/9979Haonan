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
module.exports=vender;
