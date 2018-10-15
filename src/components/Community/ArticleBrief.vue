<template>
  <div>
    <ul class="articleBrief">
      <li>
        <router-link to="/article_detail">一周菜单：蒜香奶油烤鱼</router-link>
        <router-link to="/community_author"><span>作者：编辑部</span></router-link>
      </li>
      <li>
        生活小常识：瓶装啤酒喝生啤酒的区别
        <span>作者：编辑部</span>
      </li>
      <li>
        专访：我心中的慕斯
        <span>作者：编辑部</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "articleBrief"
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
