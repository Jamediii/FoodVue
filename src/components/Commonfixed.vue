<template>
    <div>
      <router-link to="/">乐享食间首页</router-link>
      <router-link to="/recipes">逛食谱</router-link>
      <router-link to="/community">享食社区</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
      <img src="1.jpg" alt="">
      <select name="" id="">
        <option value="按食品名称">按食品名称</option>
        <option value="按作者">按作者</option>
      </select>
      <input type="text" >
      <button>搜寻</button>
      <router-link to="/user">写食谱</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Commonfixed"
    }
</script>

<style scoped>

</style>
