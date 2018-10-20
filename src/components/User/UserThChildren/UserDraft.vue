<template>
  <div class="no-content">
    <p>
      你写都没写,怎么会有草稿,搞笑的吧你!
      <router-link to="" class="toRouter">立马写一篇给你看</router-link>
    </p>
  </div>

</template>

<script>
  export default {
    name: "UserDraft"
  }
</script>

<style scoped>
  .no-content {
    text-align: center;
    line-height: 300px;
  }
  .toRouter {
    font-size: 20px;
    font-weight: bold;
  }
  .toRouter:hover {
    color:red;
  }
</style>
