<template>
  <aside class="Hui-aside">
    <div class="menu_dropdown bk_2">
      <!--<dl id="menu-article">-->
      <!--<dt><i class="Hui-iconfont">&#xe616;</i> 信息管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>-->
      <!--<dd>-->
      <!--<ul>-->
      <!--<li><a data-href="article-list.html" data-title="我发布的信息" href="javascript:void(0)">我发布的信息</a></li>-->
      <!--</ul>-->
      <!--</dd>-->
      <!--</dl>-->
      <dl id="menu-product">
        <dt><i class="Hui-iconfont">&#xe620;</i> 产品管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
        <dd>
          <ul>
            <!--<li><a data-href="product-add.html" data-title="新建产品" href="javascript:void(0)">新建产品</a></li>-->
            <!--<li><a data-href="product-list.html" data-title="产品管理" href="javascript:void(0)">产品管理</a></li>-->
            <li><router-link to="/product-add">新建产品</router-link></li>
            <li><router-link to="/product-list">产品管理</router-link></li>
          </ul>
        </dd>
      </dl>
      <dl id="menu-system">
        <dt><i class="Hui-iconfont">&#xe62e;</i> 店铺管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
        <dd>
          <ul>
            <!--<li><a data-href="welcome.html" data-title="店铺设置" href="javascript:void(0)">我的店铺</a></li>-->
            <!--<li><a data-href="shop-add.html" data-title="店铺设置" href="javascript:void(0)">店铺设置</a></li>-->
            <li><router-link to="/welcome">我的店铺</router-link></li>
            <li><router-link to="/show-add">店铺设置</router-link></li>
          </ul>
        </dd>
      </dl>
      <dl id="menu-member">
        <dt><i class="Hui-iconfont">&#xe60d;</i> 个人用户<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
        <dd>
          <ul>
            <!--<li><a data-href="member-add.html" data-title="个人信息" href="javascript:void(0)">个人信息</a></li>-->
            <!--<li><a data-href="member-add-user.html" data-title="实名认证" href="javascript:void(0)">实名认证</a></li>-->
            <!--<li><a data-href="member-add-work.html" data-title="公司认证" href="javascript:void(0)">企业注册</a></li>-->
            <li><router-link to="/member-add">个人信息</router-link></li>
            <li><router-link to="/member-add-user">实名认证</router-link></li>
            <li><router-link to="/member-add-work">企业注册</router-link></li>
          </ul>
        </dd>
      </dl>
    </div>
  </aside>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>
