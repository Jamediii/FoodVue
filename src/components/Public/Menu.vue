<template>
  <div>
    <p>用户菜谱制作确定页面</p>
    <input type="checkbox" v-model="flog">我认同网站法则 <br>
    <button @click="doMenu" :disabled="!flog">确定</button>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    data() {
      return {
        flog: false
      }
    },
    methods: {
      doMenu() {
        this.$router.push('/makemn');
      }
    }
  }
</script>

<style scoped>

</style>
