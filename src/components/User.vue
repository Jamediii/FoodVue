<template>
  <div>
    <p>用户界面</p>
    <form action="" id="upload"></form>
    <label for="fileWall">
      <img src="" width="100%" height="300" alt="">
    </label>
    <input type="file" id="fileWall" style="display: none" form="upload">

    <form action="" id="Headportrait"></form>
    <label for="fileHead">
      <img src="" height="100" alt="">
      <span>Miao</span>
    </label>
    <input type="file" id="fileHead" style="display: none" form="Headportrait">
    <button>编辑</button>
    <app-userth></app-userth>
  </div>
</template>

<script>
  import UserTh from './User/UserTh';
  export default {
    name: "User",
    components: {
      'app-userth': UserTh
    }

  }
</script>

<style scoped>

</style>
