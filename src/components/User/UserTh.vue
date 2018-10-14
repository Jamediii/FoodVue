<template>
  <div>
    <app-usertitle></app-usertitle>
  </div>
</template>

<script>
  // 用户信息的排版
  import UserTitle from './UserThChildren/UserTitle'
  export default {
    name: "UserTh",
      components: {
      'app-usertitle': UserTitle,
    }
  }
</script>

<style scoped>

</style>
