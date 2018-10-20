<template>
    <div>
      <!--应该导入的是该作者写的文章-->
      <article-brief></article-brief>
    </div>
</template>

<script>
  import ArticleBrief from '../Community/ArticleBrief.vue'
  export default {
    name: "AuthorWorks",
    components:{
      'article-brief':ArticleBrief,
    }
  }
</script>

<style scoped>
  p{
    text-align: left;
  }

</style>
