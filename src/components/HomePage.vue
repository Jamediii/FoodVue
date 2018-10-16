<template>
  <div>
    <app-commonfixed></app-commonfixed>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Commonfixed from './Commonfixed.vue'
  import Footer from './common/Footer.vue'
export default {
  name: 'Homepage',
  data () {
    return {
    }
  },
  components:{
    'app-footer':Footer,
    'app-commonfixed':Commonfixed
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
