// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

import VueRouter from 'vue-router'

import VueResource from 'vue-resource'
Vue.use(VueResource);

/*路由 跳转网页(注册路由)*/
import welcomes from './components/welcome'
import productAdd from './components/product-add'
import productList from './components/product-list'
import showAdd from './components/show-add'
import memberAdd from './components/member-add'
import memberUser from './components/member-add-user'
import memberWork from './components/member-add-work'


/*全局CSS*/
import'./components/static/h-ui/css/H-ui.min.css';
import'./components/static/h-ui.admin/css/H-ui.admin.css';
import'./components/lib/Hui-iconfont/1.0.8/iconfont.css';
import'./components/static/h-ui.admin/skin/default/skin.css';
import'./components/static/h-ui.admin/css/style.css';

/*全局js*/
import './components/lib/jquery/1.9.1/jquery.min.js'
// import './components/lib/layer/2.4/layer.js'
// import './components/static/h-ui/js/H-ui.min.js'
// import './components/static/h-ui.admin/js/H-ui.admin.js'
Vue.config.productionTip = false


/*使用路由*/
Vue.use(VueRouter)

//配置路由
const router = new VueRouter({
  routes:[
    {
      path:"/welcome",
      component:welcomes
    },
    {
      path:"/product-add",
      component:productAdd
    },
    {
      path:"/product-list",
      component:productList
    },
    {
      path:"/show-add",
      component:showAdd
    },
    {
      path:"/member-add",
      component:memberAdd
    },
    {
      path:"/member-add-user",
      component:memberUser
    },
    {
      path:"/member-add-work",
      component:memberWork
    }
  ],
  mode: "history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
