<template>
  <div>
    <!-- 没有食谱情况下 -->
    <div v-if="!isArray" class="no-content">
      <span>该用户还未拥有任何属于自己的食谱</span>
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
        // 判断类型 -- 默认有菜谱
        isArray: true
      }
    },
    props:['userid'], // 达人/粉丝 Id
    // 页面挂载 -- 执行
    mounted() {
      let userId = this.userid;
      // 获取菜谱基本信息
      this.$axios.get(`${$LH.url}/operat/${userId}`).then((result) => {
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
</style>
