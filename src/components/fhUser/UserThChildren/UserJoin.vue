<template>
  <div class="no-content">
    <p>不好意思,该用户还未参加过什么赛事。</p>
  </div>

</template>

<script>
  export default {
    name: "UserJoin"
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
