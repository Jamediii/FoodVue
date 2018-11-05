<template>
  <!--达人菜谱推荐-->
  <div class="w" id="userRecipeRecom">
    <el-row>
    <!--背景大图-->
    <div class="bg">
      <img src="../../assets/userbg.jpg" style="width: 100%;margin-top: -20px;opacity: 0.9">
      <router-link to="/menu">
        <div class="create">
          发布我的新食谱<br/>(๑•̀ㅂ•́)و✧
        </div>
      </router-link>
    </div>
      <br/>
      <div class="tags">
        <div class="tag" @click="changeTag('user-recipe-brief')"><p style="margin-right: 20px">作品动态</p></div>
        <div class="tag" @click="changeTag('user-recipe-author')"><p>厨友圈</p></div>
      </div>
      <user-recipe-brief :is="currentTag" keep-alive></user-recipe-brief>
   </el-row>

    <br/>
  </div>
</template>

<script>
  import UserRecipeBrief from './UserRecipeBrief.vue'
  import RecipePopular from '../Recipes/RecipePopular.vue'
  import Recommend from './Recommend.vue'
  import UserRecipeAuthor from './UserRecipeAuthor.vue'

  export default {
    name: "UserRecipe",
    components: {
      'user-recipe-brief': UserRecipeBrief,
      'recipe-popular': RecipePopular,
      'recommend':Recommend,
      'user-recipe-author':UserRecipeAuthor
    },
    data() {
      return {
        currentTag:'user-recipe-brief'
      };
    },
    methods: {
      changeTag(tab){
        this.currentTag = tab
      }
    }
  }
</script>


<style scoped>
  .tags{
    width: 100%;
  }
  .tag{
    width: 49%;
    /*width: 50%;*/
    display: inline-block;
  }
  .bg{
    position: relative;
  }
  .create{
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -30px 0 0 -100px;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 22px;
    border-radius: 4px;
    color: white;
    background-color: rgba(192, 196, 204, 0.5);
    border: none;
    cursor:pointer;
  }
  p{
    /*border: 1px solid pink;*/
    height: 80px;
    line-height: 80px;
    color: #8cccc1;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 3px solid #8cccc1;
    cursor: pointer;
  }
  p:hover{
    /*border-bottom: 3px solid #8cccc1;*/
    background-color: gainsboro;
  }

  #userRecipeRecom {
    padding-top: 20px;
  }

  #userRecipeRecom .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 22px;
    color: white;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
  }

</style>
