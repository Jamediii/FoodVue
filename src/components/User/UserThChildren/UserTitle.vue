<template>
  <div>
    <router-link to="/user/recipe">食谱</router-link>
    <router-link to="/user/collection">收藏</router-link>
    <router-link to="/user/fans">粉丝</router-link>
    <router-link to="/user/draft">草稿</router-link>
    <router-link to="/user/join">参赛</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "UserTitle",
  }
</script>

<style scoped>

</style>
