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
    </div>
</template>

<script>
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
      }
    }
</script>

<style scoped>
#homepageModel .bigbg{
  height: 1200px;
  background: url("../../assets/rc_bg1.jpg") top center no-repeat;
}
</style>
