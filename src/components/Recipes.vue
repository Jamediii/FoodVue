<template>
<div class="w">
  <br/>
  <!--轮播图-->
  <el-row :gutter="20">
    <el-col :span="24">
      <loop-pic></loop-pic>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="24">
      <recipe-selected></recipe-selected>
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
        'recipe-selected':RecipeSelected,
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .bg-purple {
    background: white;
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

</style>
