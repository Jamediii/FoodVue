<template>
  <div class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="20">
      <el-col :span="17" :offset="2">
        <el-header class="title">享食社区&nbsp;&nbsp;>>&nbsp;{{authorName}}&nbsp;&nbsp;>>&nbsp;全部文章</el-header>
        <!--<p style="font-size: 18px">-->
          <!--爱料理 编辑部-->
          <!--&lt;!&ndash;{{authorName}}&ndash;&gt;-->
          <!--发表的文章-->
        <!--</p>-->
        <author-works></author-works>
      </el-col>
      <el-col :span="7">
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
        authorName:'',
      }
    },
    monted(){
      this.$on("authorName",function(data){
        this.authorName=data;
      });
    }
  }
</script>

<style scoped>
  div{
    /*background-color: #fdf6dc;*/
  }

  p{
    height: 20px;
  }

</style>
