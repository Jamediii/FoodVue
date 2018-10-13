<template>
  <div class="hello">
    <app-commonfixed></app-commonfixed>
    <app-footer></app-footer>
  </div>
</template>

<script>
  //导入导航栏固定组件
  import commonfixed from './Commonfixed.vue'

  //导入底部组件
  import footer from './common/Footer.vue'
export default {
  name: 'Homepage',
  components:{

    'app-commonfixed':commonfixed,
    'app-footer':footer,
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
