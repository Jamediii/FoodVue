<template>
    <div>
      <app-recipeimg></app-recipeimg>
      <app-sowing-map></app-sowing-map>
      <app-article-recommend></app-article-recommend>
      <app-popular-recipes></app-popular-recipes>
      <app-recent-acivities></app-recent-acivities>
    </div>
</template>

<script>
  //导入图标组件
  import recipeimg from './RecipeIcon.vue'
  //导入轮播图相关组件
  import sowingmap from './SowingMap.vue'
  //导入文章推荐相关组件
  import articlerecommend from './ArticleRecommends.vue'
  //导入最受欢迎推荐
  import popularRecipes from './PopularRecipes.vue'
  //导入活动组件
  import recentAcivities from './RecentActivities.vue'
    export default {
        name: "HomePageMiddle",
      components:{
        'app-recipeimg':recipeimg,
        'app-sowing-map':sowingmap,
        'app-article-recommend':articlerecommend,
        'app-popular-recipes':popularRecipes,
        'app-recent-acivities':recentAcivities
      }
    }
</script>

<style scoped>

</style>
