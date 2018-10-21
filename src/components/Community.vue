<template>
  <div>
    <br/>
    <!--<article-nav></article-nav>-->
    <el-row :gutter="30">
      <el-col :span="11" :offset="4">
        <!--左边-->
          <el-container>
          <el-header>所有文章&nbsp;&nbsp;>></el-header>
          <el-main>
          <article-brief></article-brief>
          </el-main>
          </el-container>
      </el-col>
      <!--右边-->
      <!--<div id="right">-->
        <el-col :span="5">
          <article-search></article-search><br/>
          <author-list></author-list>
        </el-col>
      <!--</div>-->


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
  /*#right{*/
    /*position: fixed;*/
    /*top: 300px;*/
    /*left: 1000px;*/
  /*}*/
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
