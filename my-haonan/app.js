"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const router = require('./router');
const PORT = 3010;

const uuid = require('node-uuid');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false ,limit: 2 * 1024 * 1024 * 1024 * 1024}));
app.use(express.static('dist'));
// app.set("views", path.join(__dirname, "dist"));
// app.set("view engine", "html");
// app.engine( '.html', require( 'ejs' ).__express );
// app.use(router);

app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.post('/upload',(req,res)=>{
  console.log(req.body.base64);
  //res.send("0");
  //console.log(uuid.v4());
  var imgPath=uuid.v4();
  var tpye=".unknow";
  if(req.body.base64.indexOf("image/png")>0)
    tpye=".png";
  if(req.body.base64.indexOf("image/jpg")>0)
    tpye=".jpg";
  if(req.body.base64.indexOf("image/jpeg")>0)
    tpye=".jpeg";
  imgPath+=tpye;
  var base64Data = req.body.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');
  var savePath=__dirname + '/dist/img/' + imgPath;
  fs.writeFile(savePath, dataBuffer, function(err) {
    if(err){
      res.send("0");
    }else{
      res.send(imgPath);
    }
  });
});

var server = app.listen(PORT,"0.0.0.0", function () {
  console.log('已启动', PORT);
});

