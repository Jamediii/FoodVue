import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Recipes from '../components/Recipes.vue'
import User from '../components/User.vue'
import Community from '../components/Community.vue'
//登录
import Login from '../components/common/Login.vue'
//注册
import Register from '../components/common/Register.vue'
//首页中间的---导入子路由部分
import HomePageMiddle from '../components/homePage/HomePageMiddle.vue'
// 用户确定制作菜谱界面
import Menu from '../components/Public/Menu.vue'
// 用户制作菜谱界面
import Makemn from '../components/Public/Menu/Makemn.vue'
//添加活动组件
import Activity from '../components/Activity.vue'

Vue.use(Router);

// 用户界面的浏览路由
import {browseUser} from './UserRouter/BrowseUser.js'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'HomePageMiddle',
          component: HomePageMiddle,
        },
        {
          path: 'recipes',
          name: 'Recipes',
          component: Recipes,
        },
        {
          path: 'community',
          name: 'Community',
          component: Community,
        },
        {
          path: 'activity',
          name: 'Activity',
          component: Activity,
        },
      ]
    },
    // 根组件一定要带'/',子组件则不需要
    {
      // 用户--我的显示路由
      path: '/user',
      name: 'User',
      component: User,
      children: browseUser
    },
    // 用户是否真的要制作菜谱路由
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    // 用户填写菜谱路由
    {
      path: '/makemn',
      name: 'Makemn',
      component: Makemn
    },
    //登录
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //注册
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})
