<template>
  <div>
    <br/>
    <el-row :gutter="30">
      <el-col :span="10" :offset="5">
        <p style="font-size: 18px">
          爱料理 编辑部
          <!--{{authorName}}-->
          发表的文章
        </p>
        <author-works></author-works>
      </el-col>
      <el-col :span="4">
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
