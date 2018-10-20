<template>
<div>
  <br/>
  <!--轮播图-->
  <el-row :gutter="20">
    <el-col :span="13" :offset="6">
      <loop-pic></loop-pic>
    </el-col>
  </el-row>

  <el-row :gutter="20" >
    <el-col :span="12" :offset="6">
      <el-container>
        <el-header>最近流行的菜谱&nbsp;&nbsp;>></el-header>
      </el-container>
    </el-col>
  </el-row>
<!--九宫格，菜谱简介-->
  <!--第一行-->
  <el-row :gutter="40">
    <el-col :span="4" :offset="6">
      <recipe-brief></recipe-brief>
    </el-col>
    <!--<el-col :span="4" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="4" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
  </el-row>
  <!--第二行-->
  <el-row :gutter="40">
    <el-col :span="4" :offset="6">
      <recipe-brief></recipe-brief>
    </el-col>
    <!--<el-col :span="4" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="4" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
  </el-row>

  <el-row :gutter="20" >
    <el-col :span="12" :offset="6">
      <el-container>
        <el-header>品牌厨房精选菜谱&nbsp;&nbsp;>></el-header>
      </el-container>
    </el-col>
  </el-row>

  <!--第一行-->
  <el-row :gutter="40">
    <el-col :span="3" :offset="6">
      <recipe-brief></recipe-brief>
    </el-col>
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
  </el-row>
  <!--第二行-->
  <el-row :gutter="40">
    <el-col :span="3" :offset="6">
      <recipe-brief></recipe-brief>
    </el-col>
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
    <!--<el-col :span="3" >-->
      <!--<recipe-brief></recipe-brief>-->
    <!--</el-col>-->
  </el-row>

  <br/>
</div>
</template>

<script>
  import RecipeBrief from './Recipes/RecipeBrief.vue'
  import LoopPic from './Recipes/LoopPic.vue'
    export default {
        name: "Recipes",
      components:{
        'recipe-brief':RecipeBrief,
        'loop-pic':LoopPic
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
