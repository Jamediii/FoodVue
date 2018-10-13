import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Recipes from '../components/Recipes.vue'
import User from '../components/User.vue'
import Community from '../components/Community.vue'
import HomePageMiddle from '../components/homePage/HomePageMiddle.vue'
import  Login from '../components/common/Login.vue'
import Register from '../components/common/Register.vue'
import Activity from '../components/Activity.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children:[
        {path:'',component:HomePageMiddle},
        {path:'recipes',component:Recipes},
        {path:'community',component:Community},
        {path:'user',component:User},
        {path:'activity',component:Activity}
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path:'/login',
      name: 'Login',
      component: Login,
    },
    {
      path:'/register',
      name: 'Register',
      component: Register,
    },

  ]
})
