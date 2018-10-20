<template>
  <div>
    <!-- 没有粉丝情况下 -->
    <div v-if="recipesY.length <= 0" class="no-content">
      <span>他到现在都还没有一个粉丝?</span>
    </div>
    <!--有粉丝情况下-->
    <el-row :gutter="20" v-else>
      <div v-for="(data,key) in recipesY" class="fans-cont">
        <el-col :span="4">
          <img :src="data.headPhoto" :alt="data.userId" :title="data.accountName">
          <span class="userName">{{data.accountName}}</span>
          <el-button
            class="to-user"
            type="primary"
            icon="el-icon-search">
            去看看
          </el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  // 显示粉丝
  export default {
    name: "UserFans",
    data() {
      return {
        // 我的Id
        userId: '',
        // 菜谱信息
        recipesY: '',
      }
    },
    props: ['userid'],
    // 页面挂载后 -- 执行
    mounted() {
      // 获取 达人/粉丝 的Id
      let userId = this.userid;
      this.$axios.get(`http://localhost:3000/users/fans/${userId}`)
        .then((result) => {
          this.recipesY = result.data.data;
        }).catch((err) => {
        console.log(err.message);
      })
    },
    methods: {
    }
  }
</script>

<style scoped>
  /* 没有东西 */
  .no-content {
    text-align: center;
    line-height: 300px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  /* 有东西 */
  .fans-cont img {
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .fans-cont > div {
    padding-left: 20px !important;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  /*--> 动画 <--*/
  .userName {
    position: absolute;
    right: 0;
    top: 25px;
    font-size: 16px;
    overflow: hidden;
    width: 70px;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fans-cont > div:hover .userName {
    animation: showUserName 0.2s ease-out forwards;
  }

  @keyframes showUserName {
    from {
      font-size: 16px;
    }
    to {
      font-size: 14px;
      transform: translateY(-10px);
    }
  }

  /*去别人页面按钮*/
  .to-user {
    position: absolute;
    right: -100px;
    bottom: 10px;
    width: 80px;
    height: 25px;
    font-size: 14px;
    padding: 0;
  }

  .fans-cont > div:hover .to-user {
    animation: showButton 0.2s ease-out forwards;
  }

  @keyframes showButton {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-100px);
    }
  }
</style>
