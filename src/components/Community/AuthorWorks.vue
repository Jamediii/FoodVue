<template>
    <div>
      <p>编辑部发表的文章：</p>
      <article-brief></article-brief>
      <router-view></router-view>
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
