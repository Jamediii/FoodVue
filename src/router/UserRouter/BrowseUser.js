// 去制作新食谱的路由
import userCollection from '../../components/User/UserThChildren/UserCollection';
// 显示用户的所有菜谱路由
import userRecipe from '../../components/User/UserThChildren/UserRecipes';
// 显示用户所有的粉丝路由
import userFans from '../../components/User/UserThChildren/UserFans'
// 显示用户还未完成的草稿作品
import userDraft from '../../components/User/UserThChildren/UserDraft'
// 显示用户的参赛项目
import userJoin from '../../components/User/UserThChildren/UserJoin'

export const browseUser = [
  {
    path: 'collection',
    component: userCollection
  },
  {
    path: 'recipe',
    component: userRecipe
  },
  {
    path: 'fans',
    component: userFans
  },
  {
    path: 'draft',
    component: userDraft
  },
  {
    path: 'join',
    component: userJoin
  }
];
