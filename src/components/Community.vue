<template>
  <div>
    <br/>
    <!--<article-nav></article-nav>-->
    <el-row :gutter="30">
      <el-col :span="10" :offset="5">
        <!--<span style="font-size: 18px;color: #333;">所有文章</span>-->
        <el-container>
          <el-header>所有文章&nbsp;&nbsp;>></el-header>
        </el-container>
        <article-brief></article-brief>
      </el-col>
      <el-col :span="4">
        <article-search></article-search><br/>
        <author-list></author-list>
      </el-col>
    </el-row>
    <br/>
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

</style>
