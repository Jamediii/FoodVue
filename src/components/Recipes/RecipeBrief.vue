<template>
  <div>
    <!--<p>是菜谱简介哦</p>-->
    <ul class="recipeBrief">
      <li>
        <router-link to="/recipe_detail">蒜香奶油烤鱼</router-link>
        <router-link to="/recipe_author"><span>作者：黑黑黑</span></router-link>
      </li>
      <li>
        木乃伊便当
        <span>作者：木乃伊</span>
      </li>
      <li>
        柴犬团子
        <span>作者：柴柴</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "RecipeBrief"
    }
</script>

<style scoped>
  ul{
    list-style: none;
  }
  span{
    font-size: 8px;
  }
</style>
