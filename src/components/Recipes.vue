<template>
<div>
  <p>这里可以逛菜谱</p>
  <!--菜谱列表（显示的是所有菜谱的简介）-->
  <recipe-brief></recipe-brief>

</div>
</template>

<script>
  import RecipeBrief from './Recipes/RecipeBrief.vue'
    export default {
        name: "Recipes",
      components:{
          'recipe-brief':RecipeBrief
      }
    }
</script>

<style scoped>

</style>
