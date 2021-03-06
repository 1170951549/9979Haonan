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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: 2 * 1024 * 1024 * 1024 * 1024}));

app.use('/picSever', proxy('tp1.015144.com'));
app.use(express.static('dist'));
app.use(router);
// app.set("views", path.join(__dirname, "dist"));
// app.set("view engine", "html");
// app.engine( '.html', require( 'ejs' ).__express );
// app.use(router);

/*图片裁剪*/
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

