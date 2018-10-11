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
mongoose.connection.on('connected', () => {
  console.log('数据库连接成功！');
});
mongoose.connection.on('error', () => {
  console.log('数据库连接失败！');
});
mongoose.connection.on('disconnected', () => {
  console.log('数据库连接断开！');
});
mongoose.Promise = global.Promise;//为了避免警告的出现，因为mongoose的默认promise已经弃用了
//定义数据库模型 就是关系表
//监控模型
//定义数据结构 厂家
// var vender = new mongoose.Schema({
//   "厂家": String,
//   "所属产品": String,
// });
//
// var Venders = mongoose.model('厂家表',vender);//将该Schema发布为Model
// var venders = new Venders({
//   "厂家": "厦门",
//   "所属产品": "aaa",
// });
// venders.save(function (err) {//增加
//   console.log('save status:', err ? 'failed' : 'success');
// });
//
// Venders.find({}, function (err,results) {  //查找出数据库中所有数据
//   if(err){
//     console.log('error message',err);
//     return;
//   }
//   console.log('results',results);
// });
// Venders.find({}, function (err,results) {  //查找出数据库中所有数据
//   if(err){
//     console.log('error message',err);
//     return;
//   }
//   console.log('results',results);
// });


// exports.addAccount=function (a) {
//   var venders = new Venders();
//   venders.厂家 = a.厂家;
//   venders.所属产品 = a.所属产品;
//   return venders.save();
// };
// exports.findAllAccount=function () {
//   return Products.find({});
// };
// var url = "mongodb://127.0.0.1:27017/db";
// var db = mongoose.connect(url);
// db.connection.on("error", function (error) {
//   console.log("数据库连接失败：" + error);
// });
// db.connection.on("open", function () {
//   console.log("数据库连接成功");
// });



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
//添加厂家
app.post('/vender', (req, res) => {
console.log(req.body);
  res.send(req.body);
  //定义数据库模型 就是关系表
//监控模型
//定义数据结构 厂家
  var vender = new mongoose.Schema({
    "用户名": String,
    "公司名称": String,
    "联系人电话": String,
    "地址": String,
  });

  var Venders = mongoose.model('厂家表',vender);//将该Schema发布为Model
  var venders = new Venders({
    "用户名": req.body.用户名,
    "公司名称":  req.body.公司名称,
    "联系人电话":  req.body.联系人电话,
    "地址":  req.body.地址,
  });
  venders.save(function (err) {//增加
    console.log('save status:', err ? 'failed' : 'success');
  });

  Venders.find({}, function (err,results) {  //查找出数据库中所有数据
    if(err){
      console.log('error message',err);
      return;
    }
    console.log('results',results);
  });
  Venders.find({}, function (err,results) {  //查找出数据库中所有数据
    if(err){
      console.log('error message',err);
      return;
    }
    console.log('results',results);
  });
});
//添加产品
app.post('/product', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post('/upload', (req, res) => {
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

