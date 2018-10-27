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

  <!--<html-view></html-view>-->
  <!--<iframe src="../../test.html" width="1200" height="300" frameborder="0" scrolling="auto"style="position:absolute;top: -300px;left: 0px;"></iframe>-->

  <!--<iframe src="../../static/index.html"  width="100%" frameborder="0" scrolling="no" id="external-frame" onload="setIframeHeight(this)"></iframe>-->

  <br/>
</div>
</template>

<script>
  import RecipeBrief from './Recipes/RecipeBrief.vue'
  import LoopPic from './Recipes/LoopPic.vue'
  import RecipePopular from './Recipes/RecipePopular.vue'
  import RecipeSelected from './Recipes/RecipeSelected.vue'
  import View from './Recipes/View.vue'

  export default {
        name: "Recipes",
      components:{
        'recipe-brief':RecipeBrief,
        'loop-pic':LoopPic,
        'recipe-popular':RecipePopular,
        'recipe-selected':RecipeSelected,
        'html-view':View
      },
      method:{
            setIframeHeight(iframe) {
              if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                  iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                }
              }
            }
      }


  // window.onload = function () {
  //   setIframeHeight(document.getElementById('external-frame'));
  // };
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
