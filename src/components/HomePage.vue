<template>
  <div>
    <img src="../assets/logo.png">
    <h1>首页</h1>
    <router-link to="/user">去我的界面</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
