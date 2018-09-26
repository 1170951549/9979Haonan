<template>
  <section class="Hui-article-box">
    <div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
      <div class="Hui-tabNav-wp">
        <ul id="min_title_list" class="acrossTab cl">
          <li class="active">
            <span v-bind:title="title" data-href="welcome.html">{{title}}</span>
            <em></em></li>
        </ul>
      </div>
      <div class="Hui-tabNav-more btn-group">
        <a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;">
          <i class="Hui-iconfont">&#xe6d4;</i>
        </a>
        <a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i>
        </a>
      </div>
    </div>
  <div class="page-container">
    <form action="" method="post" class="form form-horizontal" id="form-article-add">
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>店铺名称：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <input type="text" class="input-text" value="" placeholder="" id="" name="">
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>推荐产品：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <input type="text" class="input-text" value="" placeholder="格式：1000001|1000002|1000003" id="" name="">
        </div>
      </div>
      <!--<div class="row cl">-->
      <!--<label class="form-label col-xs-4 col-sm-2">产品分类：</label>-->
      <!--<div class="formControls col-xs-8 col-sm-9"> <span class="select-box">-->
      <!--<select class="select" size="1" name="city">-->
      <!--<option value="" selected>请选择分类</option>-->
      <!--<option value="1">家电</option>-->
      <!--<option value="2">户外</option>-->
      <!--<option value="3">室内</option>-->
      <!--</select>-->
      <!--</span>-->
      <!--</div>-->
      <!--</div>-->
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2">店铺公告：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <textarea name="" cols="" rows="" class="textarea"  placeholder="最新店铺消息...." datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="$.Huitextarealength(this,200)"></textarea>
          <p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
        </div>
      </div>

      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2">店铺描述：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <textarea name="" cols="" rows="" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="$.Huitextarealength(this,200)"></textarea>
          <p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2">缩略图：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <div class="uploader-thum-container">
            <div id="fileList" class="uploader-list"></div>
            <div id="filePicker">选择图片</div>
            <button id="btn-star" class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>
          </div>
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-2">店铺图片：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <div class="uploader-list-container">
            <div class="queueList">
              <div id="dndArea" class="placeholder">
                <div id="filePicker-2"></div>
                <p>或将照片拖到这里，单次最多可选300张</p>
              </div>
            </div>
            <div class="statusBar" style="display:none;">
              <div class="progress"> <span class="text">0%</span> <span class="percentage"></span> </div>
              <div class="info"></div>
              <div class="btns">
                <div id="filePicker2"></div>
                <div class="uploadBtn">开始上传</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row cl">
        <div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
          <button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
          <button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
          <button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
        </div>
      </div>
    </form>
  </div>
  </section>
</template>

<script>
    export default {
        name: "show-add",
        data(){
           return{
             title:"店铺设置"
           }
        }
    }
</script>

<style scoped>

</style>
