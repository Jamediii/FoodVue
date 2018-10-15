<template>
    <div>
      <hr>
      <h3>木乃伊便当</h3>
      <button>收藏❤</button><br/>
      <br>
      <img src="https://tokyo-kitchen.icook.network/uploads/recipe/cover/90522/large_e18f9ddcf2894d28.jpg"><br/>
      <span>作者：木乃伊</span><button>关注作者</button>
      <recipe-food></recipe-food>
      <recipe-step></recipe-step>
    </div>
</template>

<script>
  import RecipeFood from './RecipeFood'
  import RecipeStep from './RecipeStep'

    export default {
        name: "RecipeDetail",
      components:{
        'recipe-food':RecipeFood,
        'recipe-step':RecipeStep
      }
    }
</script>

<style scoped>
  img{
    width: 250px;
    height: 200px;
  }

</style>
