<template>
  <div>
    <ul class="articleNav">
      <li>
        <div class="triangle"></div>生活
      </li>
      <li>
        <div class="triangle"></div>健康
      </li>
      <li>
        <div class="triangle"></div>美食
      </li>
      <li>
        <div class="triangle"></div>专访
      </li>
    </ul>

  </div>

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
    float: left;
    width: 60px;
  }
  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
    border-left: 6px solid red;
    display: inline-block;
  }
</style>
