"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const proxy = require('express-http-proxy');
const fs = require('fs');
const path = require('path');
const router = require('./router');
const PORT = 3010;

const cors = require('cors');
//随机码
const uuid = require('node-uuid');
//数据库
const mongoose=require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/db');

// 得到数据库连接句柄
const db=mongoose.connection;
//通过 数据库连接句柄，监听mongoose数据库成功的事件
db.on('open',function(err){
  if(err){
    console.log('数据库连接失败');
    throw err;
  }
  console.log('数据库连接成功')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: 2 * 1024 * 1024 * 1024 * 1024}));

app.use('/picSever', proxy('tp1.015144.com'));
app.use(express.static('dist'));
// app.set("views", path.join(__dirname, "dist"));
// app.set("view engine", "html");
// app.engine( '.html', require( 'ejs' ).__express );
// app.use(router);

//跨域
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   if (req.method == "OPTIONS") {
//     res.send(200);
//     /*让options请求快速返回*/
//     console.log(111111);
//   }
//   else {
//     next();
//     console.log(222);
//   }
// });

app.post('/upload', (req, res) => {
 // console.log(req.body.base64);
  //res.send("0");
  //console.log(uuid.v4());
  var imgPath = uuid.v4();
  var tpye = ".unknow";
  if (req.body.base64.indexOf("image/png") > 0)
    tpye = ".png";
  if (req.body.base64.indexOf("image/jpg") > 0)
    tpye = ".jpg";
  if (req.body.base64.indexOf("image/jpeg") > 0)
    tpye = ".jpeg";
  imgPath += tpye;
  var base64Data = req.body.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');
  var savePath = __dirname + '/dist/img/' + imgPath;
  fs.writeFile(savePath, dataBuffer, function (err) {
    if (err) {
      res.send("0");
    } else {
      res.send(imgPath);
    }
  });
});

var server = app.listen(PORT, "0.0.0.0", function () {
  console.log('已启动', PORT);
});

