<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-header>作品动态&nbsp;&nbsp;>></el-header>
        </el-col>
      </el-row>
      <!--流行菜谱列表-->
      <el-row :gutter="40">
        <el-col :span="16" :offset="4">
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
      components:{
          'user-recipe-brief':UserRecipeBrief,
          'recipe-popular':RecipePopular,
      },

    }
</script>

<style scoped>
  .el-header{
    background-color: #fae8c8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }

</style>
