<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html, body, div, ul, li, a, span, h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }

  body{
    background-color: #fdf6dc;
  }
  .w {
    width: 1200px;
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
</style>
