<template>
  <div>
    <app-usertitle :userid="userid"></app-usertitle>
  </div>
</template>

<script>
  // 用户信息的排版
  import UserTitle from './UserThChildren/UserTitle'

  export default {
    name: "UserTh",
    components: {
      'app-usertitle': UserTitle,
    },
    props:['userid']
  }
</script>

<style scoped>

</style>
