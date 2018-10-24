<template>
  <div>
    <div id="recipeTitle">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="菜谱宝典" name="recipe">
          <router-link :to="`/fhuser/${userid}/recipe`"></router-link>
        </el-tab-pane>

        <!--<el-tab-pane label="拥有粉丝" name="fans">
          <router-link :to="`/fhuser/${userid}/fans`"></router-link>
        </el-tab-pane>-->

        <!--<el-tab-pane label="参加赛事" name="join">
          <router-link :to="`/fhuser/${userid}/join`"></router-link>
        </el-tab-pane>-->
        <div id="content">
          <router-view :userid="userid" v-if="isRouterAlive"></router-view>
        </div>
      </el-tabs>
    </div>


  </div>
</template>

<script>
  export default {
    name: "UserTitle",
    data() {
      return {
        activeName: 'recipe',
        userId: '',
        isRouterAlive: true
      };
    },
    props: ['userid'],
    methods: {
      handleClick(tab, event) {
        this.userId = this.userid;
        let router = tab.$el.id.split('-')[1];
        this.$router.push(`/fhuser/${this.userid}/${router}`);
      }
    }
  }
</script>

<style scoped>
  #recipeTitle {
    border: 1px solid #fdf6dc;
  }
  #content {
    min-height: 300px;
    font-size: 18px;
    box-sizing: border-box;
  }
</style>
