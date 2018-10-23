<template>
  <!--达人菜谱推荐-->
  <div class="w" id="userRecipeRecom">
    <el-row>
      <el-col :span="18">
        <el-header>达人推荐&nbsp;&nbsp;>>&nbsp;&nbsp;作品动态</el-header>
      </el-col>
    </el-row>
    <!--流行菜谱列表-->
    <el-row :gutter="20">
      <el-col :span="18">
        <user-recipe-brief></user-recipe-brief>
      </el-col>
    </el-row>
    <br/>
  </div>
</template>

<script>
  import UserRecipeBrief from './UserRecipeBrief.vue'
  import RecipePopular from '../Recipes/RecipePopular.vue'

  export default {
    name: "UserRecipe",
    components: {
      'user-recipe-brief': UserRecipeBrief,
      'recipe-popular': RecipePopular,
    },

  }
</script>

<style scoped>
  #userRecipeRecom {
    padding-top: 20px;
  }

  #userRecipeRecom .el-header {
    background-color: #fae8c8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }

</style>
