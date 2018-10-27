<template>
  <!--达人菜谱推荐-->
  <div class="w" id="userRecipeRecom">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-header>达人推荐&nbsp;&nbsp;>>&nbsp;&nbsp;作品动态</el-header>
        <el-main>
          <user-recipe-brief></user-recipe-brief>
        </el-main>
      </el-col>
      <el-col :span="8">
        <!--<article-search></article-search><br/>-->
        <recommend></recommend>
      </el-col>
    </el-row>

    <br/>
  </div>
</template>

<script>
  import UserRecipeBrief from './UserRecipeBrief.vue'
  import RecipePopular from '../Recipes/RecipePopular.vue'
  import Recommend from './Recommend.vue'

  export default {
    name: "UserRecipe",
    components: {
      'user-recipe-brief': UserRecipeBrief,
      'recipe-popular': RecipePopular,
      'recommend':Recommend
    },

  }
</script>

<style scoped>
  #userRecipeRecom {
    padding-top: 20px;
  }

  #userRecipeRecom .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 18px;
    color: white;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
  }

</style>
