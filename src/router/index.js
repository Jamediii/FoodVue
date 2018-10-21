import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Recipes from '../components/Recipes.vue'
// 我的界面显示内容
import User from '../components/User.vue'
// 达人/粉丝界面显示
import fhUser from '../components/fhUser.vue'
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

// 显示文章的全部内容
import ArticleDetail from '../components/Community/ArticleDetail.vue'
//文章的作者
import CommunityAuthor from '../components/Community/CommunityAuthor.vue'
//显示某个菜谱的全部内容（菜谱详情）
import RecipeDetail from'../components/Recipes/RecipeDetail.vue'
//菜谱的作者
import RecipeAuthor from '../components/Recipes/RecipeAuthor.vue'
//导入服务条款
import ServerItem from "../components/Public/ServerItem.vue"
//导入分类的列表
import RecipeClassList from '../components/Recipes/recipeClassList.vue'

//达人推荐。用户上传的菜谱展示页
import UserRecipe from '../components/Community/UserRecipe.vue'
//达人推荐。用户上传的菜谱详情页
import UserRecipeDetail from '../components/Community/UserRecipeDetail.vue'


Vue.use(Router);

// 用户界面的浏览路由
import {browseUser} from './UserRouter/BrowseUser.js'
// 达人/粉丝界面的浏览路由
import {fhBrowseUser} from './FhUserRouter/BrowseUser.js'
//显示修改用户资料组件
import ModifyUserInfo from '../components/User/UserInfoModify/ModifyUserInfo.vue'


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
          // children:recipeContent
        },
        {
          path: 'community',
          name: 'Community',
          component: Community,
          // children:community
        },
        {
          path: 'activity/:activityId',
          name: 'Activity',
          component: Activity,
        },
        // 显示文章的全部内容
        {
          path:'article_detail/:articleId',
          component:ArticleDetail
        },
        //文章的作者
        {
          path:'community_author',
          component:CommunityAuthor
        },
        //显示某个菜谱的全部内容
        {
          path:'recipe_detail/:detailsId',
          component:RecipeDetail
        },
        //菜谱的作者
        {
          path:'recipe_author',
          component:RecipeAuthor
        },

        //达人推荐。用户上传的菜谱展示页
        {
          path:'user_recipe',
          component:UserRecipe
        },
        //达人推荐。用户上传的菜谱详情页
        {
          path:'user_recipe/:dietId',
          component:UserRecipeDetail
        },

        // 用户是否真的要制作菜谱路由
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        // 根组件一定要带'/',子组件则不需要
        {
          // 用户--我的显示路由
          path: '/user',
          name: 'User',
          component: User,
          children: browseUser
        },
        {
          // 用户资料修改路由
          path: '/modifyinfo',
          name: 'ModifyUserInfo',
          component: ModifyUserInfo
        },
        {
          // 用户粉丝--显示路由
          path: '/fhuser/:userId',
          name: 'fhUser',
          component: fhUser,
          children: fhBrowseUser
        },
        // 用户填写菜谱路由
        {
          path: '/makemn',
          name: 'Makemn',
          component: Makemn
        },
        //分类后的菜谱路由
        {
          path: '/recipecl/:recipeClassifyId',
          name: 'RecipeClassList',
          component: RecipeClassList
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
    },

    //服务条款
    {
      path: '/sitem',
      name: 'ServerItem',
      component: ServerItem
    }
  ],
  mode:'history'
})
