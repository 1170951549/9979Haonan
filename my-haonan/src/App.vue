<template>
  <div id="app">
    <router-view></router-view>
    <headers></headers>
    <home></home>
    <!--<welcome></welcome>-->
    <!--<product-list></product-list>-->
  </div>
</template>

<script>
  /*注册组件*/
  import headers from './components/Header'
  import home from './components/Home'
  import welcome from './components/welcome'
  import productAdd from './components/product-add'
  import productList from './components/product-list'
  import showAdd from './components/show-add'
  import member from './components/member-add'
  import memberUser from './components/member-add-user'
  import memberWork from './components/member-add-work'

  import './components/lib/jquery/1.9.1/jquery.min.js'
export default {
  name: 'App',
  components:{
    headers,home,welcome,productAdd,productList,showAdd,member,memberUser,memberWork
  }
}
  $(document).ready(function(){
    $(".Hui-aside dl").on("click",function(){
      $(".Hui-aside dl dd").hide();
      $(".Hui-aside dl dd").eq($(".Hui-aside dl").index($(this))).show()
    })

    $(".dropDown_A").on("hover",function(){


    })
    $(".dropDown").hover(function(){
      $(this).children(".dropDown-menu").show()
    },function(){
      $(".dropDown-menu").hide();
    })
  })


</script>

<style>
#app {

}
.dropDown-menu{
  position: absolute;
}
</style>
