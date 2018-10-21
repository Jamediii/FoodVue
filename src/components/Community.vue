<template>
  <div class="w">
    <p></p>
    <el-row :gutter="20">
      <el-col :span="15" :offset="2">
        <el-header>所有文章&nbsp;&nbsp;>></el-header>
        <el-main>
        <article-brief></article-brief>
        </el-main>
      </el-col>
      <el-col :span="5">
      <article-search></article-search><br/>
      <author-list></author-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ArticleNav from './Community/ArticleNav.vue'
  import ArticleBrief from './Community/ArticleBrief.vue'
  import ArticleSearch from './Community/ArticleSearch.vue'
  import AuthorList from './Community/AuthorList.vue'

  export default {
    name: "Community",
    components:{
      'article-nav':ArticleNav,
      'article-brief':ArticleBrief,
      'article-search':ArticleSearch,
      'author-list':AuthorList
    }

  }
</script>

<style scoped>
  div{
    background-color: #fdf6dc;
  }
  p{
    height: 20px;
  }
  .el-header{
    background-color: #fae8c8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }
  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
  }

</style>
