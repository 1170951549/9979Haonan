<template>
  <section class="Hui-article-box">
    <div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
      <div class="Hui-tabNav-wp">
        <ul id="min_title_list" class="acrossTab cl">
          <li class="active">
            <span title="产品列表" data-href="welcome.html">产品列表</span>
            <em></em></li>
        </ul>
      </div>
      <div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
    </div>
  <div>
    <nav class="breadcrumb">
      <i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;
    </span> 产品管理 <span class="c-gray en">&gt;</span>
      产品列表
      <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" >
      <i class="Hui-iconfont">&#xe68f;</i>
    </a>
    </nav>
    <div class="page-container">
      <div class="text-c"> 日期范围：
        <input type="text" onfocus="WdatePicker({ maxDate:'#F{$dp.$D(\'logmax\')||\'%y-%M-%d\'}' })" id="logmin" class="input-text Wdate" style="width:120px;">
        -
        <input type="text" onfocus="WdatePicker({ minDate:'#F{$dp.$D(\'logmin\')}',maxDate:'%y-%M-%d' })" id="logmax" class="input-text Wdate" style="width:120px;">
        <input type="text" name="" id="" placeholder=" 产品名称" style="width:250px" class="input-text">
        <button name="" id="" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i> 搜产品</button>
      </div>
      <div class="cl pd-5 bg-1 bk-gray mt-20">
			<span class="l">
				<a href="javascript:;" onclick="datadel()" class="btn btn-danger radius">
					<i class="Hui-iconfont">&#xe6e2;</i> 批量删除
				</a>
				<a class="btn btn-primary radius" onclick="product_add('添加产品','product-add.html')" href="javascript:;">
					<i class="Hui-iconfont">&#xe600;</i> 新建产品
				</a>
			</span>
        <span class="r">共有数据：<strong>{{products.length}}</strong> 条</span> </div>
      <div class="mt-20">
        <table class="table table-border table-bordered table-bg table-hover table-sort">
          <thead>
          <tr class="text-c">
            <th width="40"><input name="" type="checkbox" value=""></th>
            <th width="40">ID</th>
            <th width="60">缩略图</th>
            <th width="100">产品名称</th>
            <th width="100">产品分类</th>
            <th>描述</th>
            <th width="100">单价</th>
            <th width="60">发布状态</th>
            <th width="100">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-c va-m" v-for="pro in products">
            <td><input name="" type="checkbox" value=""></td>
            <td>{{pro.id}}</td>
            <td>
              <a href="javascript:;"><img width="60" class="product-thumb" v-bind:src="pro.img"></a>
            </td>
            <td class="text-l"><a style="text-decoration:none" href="javascript:;">{{pro.name}}</a></td>
            <td>{{pro.clas}}</td>
            <td class="text-l">{{pro.des}}</td>
            <td>{{pro.price}}</td>
            <td class="td-status"><span class="label label-success radius">已发布</span></td>
            <td class="td-manage">
              <a style="text-decoration:none" onClick="product_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>
              <a style="text-decoration:none" class="ml-5" onClick="product_edit('产品编辑','product-add.html','10001')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
              <a style="text-decoration:none" class="ml-5" onClick="product_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
              <a style="text-decoration:none" class="ml-5" title="分享链接"><img style="width: 12px;height: 13px" src="90sheji_linggan_13361849.png"></a>
            </td>
          </tr>
          <!--<tr class="text-c va-m">-->
            <!--<td><input name="" type="checkbox" value=""></td>-->
            <!--<td>001</td>-->
            <!--<td><a onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img width="60" class="product-thumb" src="temp/product/Thumb/6204.jpg"></a></td>-->
            <!--<td class="text-l"><a style="text-decoration:none" onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img title="国内品牌" src="static/h-ui.admin/images/cn.gif"> <b class="text-success">圣象</b> 哥本哈根橡木地板KS8373</a></td>-->
            <!--<td>电器</td>-->
            <!--<td class="text-l">原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美,在视觉上给人带来深邃联想.多款产品适合搭配不同的风格的室内装饰;功能流露出尊贵典雅的大气韵味。</td>-->
            <!--<td><span class="price">356.0</span> 元/平米</td>-->
            <!--<td class="td-status"><span class="label label-success radius">已发布</span></td>-->
            <!--<td class="td-manage">-->
              <!--<a style="text-decoration:none" onClick="product_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_edit('产品编辑','product-add.html','10001')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" title="分享链接"><img style="width: 12px;height: 13px" src="90sheji_linggan_13361849.png"></a>-->
            <!--</td>-->
          <!--</tr>-->
          <!--<tr class="text-c va-m">-->
            <!--<td><input name="" type="checkbox" value=""></td>-->
            <!--<td>001</td>-->
            <!--<td><a onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img width="60" class="product-thumb" src="temp/product/Thumb/6204.jpg"></a></td>-->
            <!--<td class="text-l"><a style="text-decoration:none" onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img title="国内品牌" src="static/h-ui.admin/images/cn.gif"> <b class="text-success">圣象</b> 哥本哈根橡木地板KS8373</a></td>-->
            <!--<td>电器</td>-->
            <!--<td class="text-l">原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美,在视觉上给人带来深邃联想.多款产品适合搭配不同的风格的室内装饰;功能流露出尊贵典雅的大气韵味。</td>-->
            <!--<td><span class="price">356.0</span> 元/平米</td>-->
            <!--<td class="td-status"><span class="label label-success radius">已发布</span></td>-->
            <!--<td class="td-manage">-->
              <!--<a style="text-decoration:none" onClick="product_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_edit('产品编辑','product-add.html','10001')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" title="分享链接"><img style="width: 12px;height: 13px" src="90sheji_linggan_13361849.png"></a>-->
            <!--</td>-->
          <!--</tr>-->
          <!--<tr class="text-c va-m">-->
            <!--<td><input name="" type="checkbox" value=""></td>-->
            <!--<td>001</td>-->
            <!--<td><a onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img width="60" class="product-thumb" src="temp/product/Thumb/6204.jpg"></a></td>-->
            <!--<td class="text-l"><a style="text-decoration:none" onClick="product_show('哥本哈根橡木地板','product-show.html','10001')" href="javascript:;"><img title="国内品牌" src="static/h-ui.admin/images/cn.gif"> <b class="text-success">圣象</b> 哥本哈根橡木地板KS8373</a></td>-->
            <!--<td>电器</td>-->
            <!--<td class="text-l">原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美,在视觉上给人带来深邃联想.多款产品适合搭配不同的风格的室内装饰;功能流露出尊贵典雅的大气韵味。</td>-->
            <!--<td><span class="price">356.0</span> 元/平米</td>-->
            <!--<td class="td-status"><span class="label label-success radius">已发布</span></td>-->
            <!--<td class="td-manage">-->
              <!--<a style="text-decoration:none" onClick="product_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_edit('产品编辑','product-add.html','10001')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" onClick="product_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>-->
              <!--<a style="text-decoration:none" class="ml-5" title="分享链接"><img style="width: 12px;height: 13px" src="90sheji_linggan_13361849.png"></a>-->
            <!--</td>-->
          <!--</tr>-->
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
    export default {
        name: "product-list",
        data(){
            return{
              products:[
                {
                  id:'01',
                  img:'temp/product/Thumb/6204.jpg',
                  name:"产品1",
                  clas:"家用",
                  des:"原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美",
                  price:"356.0 元/平米"
                },
                {
                  id:'02',
                  img:'temp/product/Thumb/6204.jpg',
                  name:"产品1",
                  clas:"家用",
                  des:"原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美",
                  price:"356.0 元/平米"
                },
                {
                  id:'03',
                  img:'temp/product/Thumb/6204.jpg',
                  name:"产品1",
                  clas:"家用",
                  des:"原木的外在,实木条形结构,色泽花纹自然,写意;款式设计吸取实木地板的天然去雕饰之美",
                  price:"356.0 元/平米"
                }
              ]
            }
         }
    }
</script>

<style scoped>

</style>
