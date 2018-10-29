<template>
  <div>
    <!-- 没有粉丝情况下 -->
    <div v-if="recipesY.length <= 0" class="no-content">
      <span>到现在都还没有一个粉丝?</span>
      <router-link to="/user_recipe" class="toRouter">马上互粉别人吧！</router-link>
    </div>
    <!--有粉丝情况下-->
    <el-row :gutter="20" v-else>
      <div v-for="data in recipesY" class="fans-cont">
        <el-col :span="4">
          <img :src="data.headPhoto" :alt="data.userId" :title="data.accountName">
          <span class="userName">{{data.accountName}}</span>
          <el-button
            class="to-user"
            type="primary"
            icon="el-icon-search"
            @click.native="toUserInfo(data.userId)">
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
        // 粉丝信息
        recipesY: '',
        // 粉丝的菜谱信息
        recipes: []
      }
    },
    props: ['userid'],
    // 页面挂载后 -- 执行
    mounted() {
      // 获取 我的Id
      this.$axios.get(`${$LH.url}/users/fans/${localStorage.getItem('userId')}`)
        .then((result) => {
          console.log(result.data.data);
          this.recipesY = result.data.data;
          // 获取到每个粉丝的id
          let length = this.recipesY.length;
          for (let i = 0; i < length; i++) {
            let fansId = result.data.data[i].userId;
            // 获取到每个粉丝的菜谱信息
            this.$axios.get(`${$LH.url}/recipes/brief/${fansId}`)
              .then(fansResult => {
                this.recipes.push(fansResult.data.data);
                console.log(this.recipes);
              }).catch(err => {
              console.log(err);
            })
          }
        }).catch((err) => {
        console.log(err.message);
      })
    },
    methods: {
      toUserInfo(userId) {
        this.$router.push(`/fhuser/${userId}`);
      }
    }
  }
</script>

<style scoped>
  /* 没有东西 */
  .no-content {
    text-align: center;
    line-height: 300px;
  }

  a:hover {
    color: red;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .toRouter {
    font-size: 20px;
    font-weight: bold;
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
      box-shadow: 0 0;
    }
    to {
      font-size: 14px;
      transform: translateY(-10px);
      box-shadow: 1px 1px 3px #bdc321;
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
