// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/store.js'
import jquery from 'jquery'
// import animate from 'animate.css'

// Vue.use(animate);
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
router.beforeEach((to, from, next) => {
  //获取用户登录成功后存储的登录标志
  let getFlag = localStorage.getItem("Flag");
  //如果登录标志存在且为isLogin，即为用户登录
  if (getFlag === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.user.state = true;
    next();
    //如果已登录还想进入登录注册页面，则定向回首页
    // if (!to.meta.isLogin) {
    //   alert('请先退出登录！！');
    //   next({
    //     path: '/'
    //   })
    // }
    //如果登录标志不存在，即未登录
  } else {
    if (to.meta.isLogin) {
      next({
        path: '/login',
      });
      alert('请先登录');
    } else {
      next()
    }
  }
});
router.afterEach(route => {
  window.scroll(0, 0);
})


