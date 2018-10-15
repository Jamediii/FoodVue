<template>
  <div>
    <p>这里是享食社区</p>
    <!--导航栏-->
    <article-nav></article-nav>
    <br/><br/>
    <!--文章搜索（实现搜索功能）-->
    <article-search></article-search>
    <!--文章列表（显示的是所有文章的简介）-->
    <article-brief></article-brief>

  </div>
</template>

<script>
  import ArticleNav from './Community/ArticleNav.vue'
  import ArticleBrief from './Community/ArticleBrief.vue'
  import ArticleSearch from './Community/ArticleSearch.vue'

  export default {
    name: "Community",
    components:{
      'article-nav':ArticleNav,
      'article-brief':ArticleBrief,
      'article-search':ArticleSearch,
    }
  }
</script>

<style scoped>

</style>
