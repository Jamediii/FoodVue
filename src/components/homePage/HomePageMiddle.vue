<template>

    <div id="homepageModel">
      <app-recipeimg></app-recipeimg>
      <app-sowing-map></app-sowing-map>
      <app-popular-recipes></app-popular-recipes>
      <el-row class="bigbg">
        <el-col :span="24">
          <app-recipes-recommend></app-recipes-recommend>
          <app-recent-acivities></app-recent-acivities>
        </el-col>
      </el-row>
      <div>
        <i @click="totop" id="topArrow" class="el-icon-caret-top "></i>
      </div>

    </div>
</template>

<script>
  //鼠标滚动事件
  $(function () {
    $(window).scroll(function () {
      // console.log($(document).scrollTop());
      if($(document).scrollTop()>1480 && $(document).scrollTop() <= 1600){
        var scrollT = $(document).scrollTop()-20;
        // console.log(scrollT);
        $("#recipesComm").offset({"top":scrollT});
      }

      if($(window).scrollTop() <=200){
        $("#topArrow").css("display","none");
      }else{
        $("#topArrow").css("display","block");
      }
      $("#topArrow").offset({"top":$(window).scrollTop()+200});
    });
  });
  //导入图标组件
  import recipeimg from './RecipeIcon.vue'
  //导入轮播图相关组件
  import sowingmap from './SowingMap.vue'
  //导入文章推荐相关组件
  import recipesRecommends from './RecipesRecommends.vue'
  //导入最受欢迎推荐
  import popularRecipes from './PopularRecipes.vue'
  //导入活动组件
  import recentAcivities from './RecentActivities.vue'
    export default {
        name: "HomePageMiddle",
      components:{
        'app-recipeimg':recipeimg,
        'app-sowing-map':sowingmap,
        'app-recipes-recommend':recipesRecommends,
        'app-popular-recipes':popularRecipes,
        'app-recent-acivities':recentAcivities
      },
      methods:{
        totop() {
          $(document).scrollTop(0);
        }
      }
    }
</script>

<style scoped>
#homepageModel .bigbg{
  height: 1200px;
  background: url("../../assets/rc_bg1.jpg") top center no-repeat;
}
#topArrow{
  display: block;
  /*background-color: red;*/
  text-align: center;
  font-size: 24px;
  color: #8cccc1;
  border:1px solid #ccc;
  border-radius: 50%;
  position: absolute;
  z-index:9999999999999999999999999;
  right:30px;
}
#topArrow:hover{
  color:#fff;
  background-color: #8cccc1;
}
</style>
