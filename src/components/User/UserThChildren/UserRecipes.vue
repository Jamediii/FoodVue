<template>
  <div>
    <!-- 没有食谱情况下 -->
    <div v-if="!isArray" class="no-content">
      <span>{{recipesY}},</span>
      <router-link to="/menu" class="toRouter">发表新食谱</router-link>
    </div>

    <!-- 有食谱情况下 -->
    <div v-else v-for="(data,key) in recipesY">

    </div>
  </div>
</template>

<script>
  // 显示菜谱
  export default {
    name: "UserRecipes",
    data() {
      return {
        // 菜谱信息
        recipesY: '',
        // 判断类型
        isArray: true
      }
    },
    props:['userid'], // 我的Id
    // 页面挂载 -- 执行
    mounted() {
      let userId = this.userid;
      this.$axios.get(`http://localhost:3000/operat/${userId}`).then((result) => {
        if (typeof result.data.data === "string") {
          this.isArray = false;
        }
        this.recipesY = result.data.data;
      }).catch((err) => {
        console.log(err.message);
      })
    },
    watch: {
      // recipesY(newDate,oldDate) {
      //   console.log(newDate);
      //   console.log(oldDate);
      //   return this.recipesY
      // }
    }

  }
</script>

<style scoped>
  /* 没有菜谱 */
  .no-content {
    text-align: center;
    line-height: 300px;
  }
  .no-content a:hover {
    color: red;
  }
  .toRouter {
    font-size: 20px;
    font-weight: bold;
  }
</style>
