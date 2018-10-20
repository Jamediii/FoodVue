
// 显示用户的所有菜谱路由
import userRecipe from '../../components/fhUser/UserThChildren/UserRecipes';
// 显示用户所有的粉丝路由
import userFans from '../../components/fhUser/UserThChildren/UserFans'
// 显示用户的参赛项目
import userJoin from '../../components/fhUser/UserThChildren/UserJoin'

export const fhBrowseUser = [
  {
    path: 'recipe',
    component: userRecipe
  },
  {
    path: 'fans',
    component: userFans
  },
  {
    path: 'join',
    component: userJoin
  },
];
