<template>
  <div>
    <div id="recipeTitle">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="我的菜谱" name="recipe">
          <router-link to="/user/recipe"></router-link>
        </el-tab-pane>
        <el-tab-pane label="收藏宝典" name="collection">
          <router-link to="/user/collection"></router-link>
        </el-tab-pane>
        <el-tab-pane label="关注达人" name="fans">
          <router-link to="/user/fans"></router-link>
        </el-tab-pane>
        <!--<el-tab-pane label="未完成草稿" name="draft"><router-link to="/user/draft"></router-link></el-tab-pane>-->
        <el-tab-pane label="参加赛事" name="join">
          <router-link to="/user/join"></router-link>
        </el-tab-pane>
        <div id="content">
          <router-view :userid="userid"></router-view>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  $(function () {

  });

  export default {
    name: "UserTitle",
    data() {
      return {
        activeName: 'recipe'
      };
    },
    props: ['userid'],
    methods: {
      handleClick(tab, event) {
        let router = tab.$el.id.split('-')[1];
        this.$router.push(`/user/${router}`);
      }
    },
    watch: {
      '$route'() {
        var body = $('html,body');
        var recipeTitle = $('#recipeTitle');
        // mainContainer.animate({
        //   scrollTop: scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop()
        // }, 2000);//2秒滑动到指定位置
        body.animate({
          scrollTop: recipeTitle.offset().top - body.offset().top + body.scrollTop()
        }, 10);
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
