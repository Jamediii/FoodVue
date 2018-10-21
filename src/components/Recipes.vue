<template>
<div>
  <br/>
  <!--轮播图-->
  <el-row :gutter="20">
    <el-col :span="18" :offset="3">
      <loop-pic></loop-pic>

    </el-col>
  </el-row>
  <!--九宫格，菜谱简介-->
  <!--品质厨房-->
  <el-row>
    <el-col :span="16" :offset="4">
      <el-container>
        <el-header>品牌厨房精选菜谱&nbsp;&nbsp;>></el-header>
      </el-container>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="16" :offset="4">
      <recipe-selected></recipe-selected>
    </el-col>
  </el-row>

  <!--流行菜谱-->
  <el-row>
    <el-col :span="16" :offset="4">
      <el-header>最近流行的菜谱&nbsp;&nbsp;>></el-header>
    </el-col>
  </el-row>
  <!--流行菜谱列表-->
  <el-row :gutter="40">
    <el-col :span="16" :offset="4">
      <recipe-popular></recipe-popular>
    </el-col>
  </el-row>

  <br/>
</div>
</template>

<script>
  import RecipeBrief from './Recipes/RecipeBrief.vue'
  import LoopPic from './Recipes/LoopPic.vue'
  import RecipePopular from './Recipes/RecipePopular.vue'
  import RecipeSelected from './Recipes/RecipeSelected.vue'

  export default {
        name: "Recipes",
      components:{
        'recipe-brief':RecipeBrief,
        'loop-pic':LoopPic,
        'recipe-popular':RecipePopular,
        'recipe-selected':RecipeSelected
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .bg-purple {
    /*background: #d3dce6;*/
    background: white;
  }
  div{
    background-color: #fdf6dc;
  }


  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-header{
    background-color: #fae8c8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }


</style>
