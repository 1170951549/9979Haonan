//数据库
var mongoose =require('mongoose');
var Schema   = mongoose.Schema;
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


//2.定义数据库模型 就是关系表
//厂家表
var venderInfSchema = new mongoose.Schema({
  用户名: String,
  公司名称: String,
  联系人电话: String,
  地址: String,
  所属产品:String,
});
var VenderInfModel = mongoose.model('厂家表',venderInfSchema);  //所有厂家
  exports.AddNewVender=function(VenderInf) {
  var venderInfModel = new VenderInfModel();
  venderInfModel.用户名 = VenderInf.用户名;
  venderInfModel.公司名称 = VenderInf.公司名称;
  venderInfModel.联系人电话 = VenderInf.联系人电话;
  venderInfModel.地址 = VenderInf.地址;
    venderInfModel.所属产品 = VenderInf.所属产品;
  return venderInfModel.save();
};
exports.findVenderAll=function(){
  return VenderInfModel.find({});
};
//添加厂家
// app.post('/vender', (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
//   //定义数据库模型 就是关系表
// //监控模型
// //定义数据结构 厂家
//   var vender = new mongoose.Schema({
//     "用户名": String,
//     "公司名称": String,
//     "联系人电话": String,
//     "地址": String,
//   });
//
//   var Venders = mongoose.model('厂家表',vender);//将该Schema发布为Model
//   var venders = new Venders({
//     "用户名": req.body.用户名,
//     "公司名称":  req.body.公司名称,
//     "联系人电话":  req.body.联系人电话,
//     "地址":  req.body.地址,
//   });
//   venders.save(function (err) {//增加
//     console.log('save status:', err ? 'failed' : 'success');
//   });
//
//   Venders.find({}, function (err,results) {  //查找出数据库中所有数据
//     if(err){
//       console.log('error message',err);
//       return;
//     }
//     console.log('results',results);
//   });
// });
//
// //添加产品
// app.post('/product', (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
//   //定义数据库模型 就是关系表
// //监控模型
// //定义数据结构 产品
//   var product = new mongoose.Schema({
//     "产品名称": String,
//     "图片": String,
//     "尺寸": String,
//     "产品单价": String,
//     "生产ID": String,
//     "选择厂家": String,
//   });
//
//   var Product = mongoose.model('产品表',product);//将该Schema发布为Model
//   var products = new Product({
//     "产品名称": req.body.产品名称,
//     "图片": req.body.图片,
//     "尺寸": req.body.尺寸,
//     "产品单价": req.body.产品单价,
//     "生产ID": req.body.生产ID,
//     "选择厂家": req.body.选择厂家,
//   });
//   products.save(function (err) {//增加
//     console.log('save status:', err ? 'failed' : 'success');
//   });
//
//   // Product.find({}, function (err,results) {  //查找出数据库中所有数据
//   //   if(err){
//   //     console.log('error message',err);
//   //     return;
//   //   }
//   //   console.log('results',results);
//   // });
// });
//
// app.get('/getPro', (req, res) => {
//
// });
