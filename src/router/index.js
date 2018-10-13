import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Recipes from '../components/Recipes.vue'
import User from '../components/User.vue'
import Community from '../components/Community.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/community',
      name: 'Community',
      component: Community,
    }
  ]
})
