<template>
  <div class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="30">
      <el-col :span="15" :offset="2">
        <p style="font-size: 18px">
          爱料理 编辑部
          <!--{{authorName}}-->
          发表的文章
        </p>
        <author-works></author-works>
      </el-col>
      <el-col :span="5">
        <article-search></article-search><br/>
        <author-brief></author-brief>
      </el-col>
    </el-row>
    <br/>
  </div>
</template>

<script>
  import AuthorBrief from '../Community/AuthorBrief.vue'
  import AuthorWorks from '../Community/AuthorWorks.vue'
  import ArticleSearch from './ArticleSearch.vue'

  export default {
    name: "Author",
    components:{
      'author-brief':AuthorBrief,
      'author-works':AuthorWorks,
      'article-search':ArticleSearch
    },
    data(){
      return{
        authorName:''
      }
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

</style>
