<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  html, body, div, ul, li, a, span, h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }

  body{
    background-color: #fff;
  }
  .w {
    width: 80%;
    margin: 0 auto;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  ul {
    list-style: none;
  }
  .right {
    float: right;
  }
  .left{
    float: left;
  }
  /*公共头部样式*/
  .title.el-header{
    background-color: #daeae8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }
</style>
