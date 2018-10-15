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
  所属产品:[{type:Schema.Types.ObjectId,ref:"产品表"}],
});
//产品表
var productoudSchema = new mongoose.Schema({
  产品名称: String,
  图片: String,
  尺寸: String,
  产品单价: String,
  生产ID:String,
  选择厂家:String,
});
var ProductoudModel = mongoose.model('产品表',productoudSchema);  //所有产品
var VenderInfModel = mongoose.model('厂家表',venderInfSchema);  //所有厂家
exports.AddNewVender=function(VenderInf) {
  var venderInfModel = new VenderInfModel();
  venderInfModel.用户名 = VenderInf.用户名;
  venderInfModel.公司名称 = VenderInf.公司名称;
  venderInfModel.联系人电话 = VenderInf.联系人电话;
  venderInfModel.地址 = VenderInf.地址;
  //venderInfModel.所属产品 = "";
  return venderInfModel.save();
};
//查询所有
exports.findVenderAll=function(){
  return VenderInfModel.find({});
};
exports.updateProduct =function (orderInfo) {
  ProductoudModel.findOne({"产品表":orderInfo.产品表});
  var conditions = {"产品表" : orderInfo.产品表};
  var update     = {$set :
      {
        "产品名称": orderInfo.产品名称,
        "图片": orderInfo.图片,
        "尺寸": orderInfo.尺寸,
        "产品单价": orderInfo.产品单价,
        "生产ID": orderInfo.生产ID,
        "选择厂家": orderInfo.选择厂家,
      }
  };
  var options = {upsert : true};
  ProductoudModel.updateOne(conditions,update, options).then(updataDoc=> {
      var conditions = {"产品表": orderInfo.产品表};
      var update = {
        $addToSet: {'产品表': _id}
      };
      var options = {upsert: false};
      return VenderInfModel.updateOne(conditions, update, options);
  });
};
