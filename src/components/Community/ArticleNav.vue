<template>
  <ul class="articleNav">
    <li>生活</li>
    <li>专访</li>
    <li>美食</li>
  </ul>
</template>

<script>
    export default {
        name: "ArticleNav"
    }
</script>

<style scoped>
  ul{
    list-style: none;
  }
  .articleNav li{
    float: right;
    width: 60px;
  }
</style>
