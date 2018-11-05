<template>
  <div class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="20">
      <el-col :span="16" :xs="24" :sm="24" :md="22" :lg="15" :xl="16">
        <el-header >享食社区&nbsp;&nbsp;>>&nbsp;所有文章</el-header>
        <el-main >
          <article-brief></article-brief>
        </el-main>
      </el-col>
      <el-col :span="8" class="hidden-xs-only hidden-sm-only hidden-md-only" :lg="9" :xl="8">
        <recommend></recommend>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  import ArticleBrief from './Community/ArticleBrief.vue'
  import ArticleSearch from './Community/ArticleSearch.vue'
  import Recommend from './Community/Recommend.vue'
  import 'element-ui/lib/theme-chalk/display.css'

  export default {
    name: "Community",
    components:{
      'article-brief':ArticleBrief,
      'article-search':ArticleSearch,
      'recommend':Recommend
    }

  }
</script>

<style scoped>
  p{
    height: 20px;
  }
  .el-header{
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 22px;
    color: white;
  }
  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
  }

</style>
