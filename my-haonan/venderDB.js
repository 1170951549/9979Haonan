//数据库
var mongoose =require('mongoose');
var moment = require('moment');
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
var productoudSchema = new mongoose.Schema({
  产品名称: String,
  图片: String,
  尺寸: String,
  产品单价: String,
  生产ID:String,
  选择厂家:String,
  创建时间:{ type: Date, default: Date.now }
});

exports.AddNewProduct=function(ProductInf) {
  var productInfModel = new ProductoudModel();
  productInfModel.产品名称 = ProductInf.产品名称;
  productInfModel.图片 = ProductInf.图片;
  productInfModel.尺寸 = ProductInf.尺寸;
  productInfModel.产品单价 = ProductInf.产品单价;
  productInfModel.生产ID = ProductInf.生产ID;
  productInfModel.选择厂家 = ProductInf.生产厂家;
  return productInfModel.save();
};
//厂家表
var venderInfSchema = new mongoose.Schema({
  用户名: String,
  公司名称: String,
  联系人电话: String,
  地址: String,
  所属产品:[{type:Schema.Types.ObjectId,ref:"产品表"}],
  创建时间:{ type: Date, default: Date.now }
});
exports.AddNewVender=function(VenderInf) {
  var venderInfModel = new VenderInfModel();
  venderInfModel.用户名 = VenderInf.用户名;
  venderInfModel.公司名称 = VenderInf.公司名称;
  venderInfModel.联系人电话 = VenderInf.联系人电话;
  venderInfModel.地址 = VenderInf.地址;
  //venderInfModel.所属产品 = "";
  return venderInfModel.save();
};
var ProductoudModel = mongoose.model('产品表',productoudSchema);  //所有产品
var VenderInfModel = mongoose.model('厂家表',venderInfSchema);  //所有厂家

//添加产品 并且关联厂家
exports.updateProduct =function (orderInfo) {
  var conditions = {"产品名称" : orderInfo.产品名称};
  var update     = {$set :
      {
        "图片": orderInfo.图片,
        "尺寸": orderInfo.尺寸,
        "产品单价": orderInfo.产品单价,
        "生产ID": orderInfo.生产ID,
        "选择厂家": orderInfo.生产厂家,
        "创建时间": moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
      }
  };
  var options = {upsert : true};
  return ProductoudModel.updateOne(conditions,update, options).then(updataDoc=> {
    //console.log(updataDoc);
      if(updataDoc.upserted != undefined){
       // console.log(orderInfo.生产厂家);
        var conditions = {"公司名称":orderInfo.生产厂家};
        //console.log(updataDoc);
        var update = {
          $push: {'所属产品': updataDoc.upserted[0]._id}
        };
        var options = {upsert: false};
        return VenderInfModel.updateOne(conditions, update, options);
      }

  });
};

//查询所有
exports.findVenderAll=function(){
  return VenderInfModel.find({}).populate('所属产品');
};
exports.findVenderNameAll=function(){
  return VenderInfModel.find({}).select("公司名称");
};
//查询厂家
exports.findProductAll=function(){
  return ProductoudModel.find({}).populate('公司名称');
};
//条件查询
exports.findProductAllName=function(name){
  return ProductoudModel.find({"产品名称":name})
};

//删除产品
exports.removeProduct=function (id) {
  return ProductoudModel.remove({"_id":id});
};
//删除厂家
exports.removeVebder=function (id) {
  return VenderInfModel.remove({"_id":id});
};
//修改产品
exports.updateProductById=function (productInfo) {
  var conditions = {'_id' : productInfo['id']};
  var update     = {$set :
      {
        '产品名称': productInfo.产品名称,
        '图片': productInfo.图片,
        '尺寸': productInfo.尺寸,
        '产品单价': productInfo.产品单价,
        '生产ID': productInfo.生产ID,
        "创建时间": moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
      }
  };
  var options = {upsert : false};
  return ProductoudModel.update(conditions,update,options)
};
//修改厂家
exports.updateVenderById=function (venderInfo) {
  var conditions = {'_id' : venderInfo['id']};
  var update     = {$set :
      {
        '用户名': venderInfo.用户名,
        '公司名称': venderInfo.公司名称,
        '联系人电话': venderInfo.联系人电话,
        '地址': venderInfo.地址,
        "创建时间": moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
      }
  };
  var options = {upsert : false};
  return VenderInfModel.update(conditions,update,options)
};
