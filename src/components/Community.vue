<template>
  <div class="w">
    <p></p>
    <el-row :gutter="20">
      <el-col :span="18" >
        <el-header>享食社区&nbsp;&nbsp;>>&nbsp;所有文章</el-header>
        <el-main>
        <article-brief></article-brief>
        </el-main>
      </el-col>
      <el-col :span="6">
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
    background-color: #fff;
  }
  p{
    height: 20px;
  }
  .el-header{
    background-color: #8cccc1;
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
