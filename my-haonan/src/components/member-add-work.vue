<template>
  <section class="Hui-article-box">
    <div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
      <div class="Hui-tabNav-wp">
        <ul id="min_title_list" class="acrossTab cl">
          <li class="active">
            <span title="企业注册" data-href="welcome.html">企业注册</span>
            <em></em></li>
        </ul>
      </div>
      <div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
    </div>
  <article class="page-container">
    <form action="" method="post" class="form form-horizontal" id="form-member-add">
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>公司名称：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <input type="text" class="input-text" value="" placeholder="" id="username" name="username">
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>公司地址：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <input type="text" class="input-text" value="" placeholder="" id="mobile" name="mobile">
        </div>
      </div>
      <!--<div class="row cl">-->
      <!--<label class="form-label col-xs-4 col-sm-3">所在城市：</label>-->
      <!--<div class="formControls col-xs-8 col-sm-9"> <span class="select-box">-->
      <!--<select class="select" size="1" name="city">-->
      <!--<option value="" selected>请选择城市</option>-->
      <!--<option value="1">北京</option>-->
      <!--<option value="2">上海</option>-->
      <!--<option value="3">广州</option>-->
      <!--</select>-->
      <!--</span> </div>-->
      <!--</div>-->
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-3">公司执照：</label>
        <div class="formControls col-xs-8 col-sm-9"> <span class="btn-upload form-group">
		<input class="input-text upload-url" type="text" name="uploadfile" id="uploadfile" readonly nullmsg="请添加附件！" style="width:200px">
		<a href="javascript:void();" class="btn btn-primary radius upload-btn"><i class="Hui-iconfont">&#xe642;</i> 浏览文件</a>
		<input type="file" multiple name="file-2" class="input-file">
		</span> </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-4 col-sm-3">公司描述：</label>
        <div class="formControls col-xs-8 col-sm-9">
          <textarea name="beizhu" cols="" rows="" class="textarea"  placeholder="说点什么...最少输入10个字符" onKeyUp="$.Huitextarealength(this,100)"></textarea>
          <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
        </div>
      </div>
      <div class="row cl">
        <div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3">
          <input class="btn btn-primary radius" type="submit" value="提交">
        </div>
      </div>
    </form>
  </article>
  </section>
</template>

<script>
    export default {
        name: "member-add-work"
    }
</script>

<style scoped>

</style>
