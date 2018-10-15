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
//产品表
var productInfSchema = new mongoose.Schema({
  产品名称: String,
  图片: String,
  尺寸: String,
  产品单价: String,
  生产ID:String,
  选择厂家:String,
});
const ProductInfModel = mongoose.model('产品表',productInfSchema);  //所有产品
exports.AddNewProduct=function(ProductInf) {
  var productInfModel = new ProductInfModel();
  productInfModel.产品名称 = ProductInf.产品名称;
  productInfModel.图片 = ProductInf.图片;
  productInfModel.尺寸 = ProductInf.尺寸;
  productInfModel.产品单价 = ProductInf.产品单价;
  productInfModel.生产ID = ProductInf.生产ID;
  //productInfModel.选择厂家 = ProductInf.生产厂家;
  return productInfModel.save();
};
exports.findProductAll=function(){
  return ProductInfModel.find({});
};
