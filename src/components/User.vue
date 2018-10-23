<template>
  <div id="bigBg">
    <div id="content" class="w">
      <div class="photo-content">
        <!--提交表单-->
        <form action="" id="Headportrait"></form>

        <!--背景图片-->
        <div
          @mouseenter="showBgBtn = !showBgBtn"
          @mouseleave="showBgBtn = !showBgBtn">
          <div class="background-pic">
            <label for="user-bg">
              <transition name="el-fade-in-linear">
                <div v-show="showBgBtn" class="chang-bg">更换背景</div>
              </transition>
            </label>
          </div>
          <input type="file" id="user-bg" style="display: none" form="Headportrait">
        </div>

        <!--头像-->
        <div class="user-pic"
             @mouseenter="showHdBtn = !showHdBtn"
             @mouseleave="showHdBtn = !showHdBtn"
        :style="{backgroundImage: 'url('+userInfo.headPhoto+')'}">
          <!--按钮显示-->
          <label for="user-hd">
            <transition name="el-zoom-in-bottom">
              <div class="chang-ushead" v-show="showHdBtn">更换</div>
            </transition>
          </label>
        </div>
        <input type="file" id="user-hd" style="display: none" form="Headportrait">
        <!--名字-->
        <span>{{userInfo.accountName}}</span>
        <!--等级-->
        <!--经验-->

        <!--去用户修改页面-->
        <router-link to="/modifyinfo">
          <el-button class="chang-userInfo"> 编辑</el-button>
        </router-link>
      </div>

      <div style="margin-top: 80px">
        <app-userth :userid="userId"></app-userth>
      </div>
    </div>
  </div>
</template>

<script>
  import UserTh from './User/UserTh';

  export default {
    name: "User",
    data() {
      return {
        showBgBtn: '', // 大背景更改按钮显示/隐藏
        showHdBtn: '', // 头像更改按钮显示/隐藏
        userId: '', // 我的id
        userInfo: {} // 用户的基本信息 --名字/头像/背景/经验/等级
      }
    },
    // methods: {
    // },
    // 页面加载后就去获取 -- 查看自己的信息
    mounted() {
      this.$router.push('/user/recipe');
      console.log(this.$getters.state.user.userId);
      this.userId = this.$store.state.user.userId;
      let userId = this.userId;
      this.$axios.get(`http://127.0.0.1:3000/users/${userId}`)
        .then((result) => {
          console.log(result);
          this.userInfo = result.data.data[0];
        }).catch(err => {
        console.log(err);
      });
    },
    components: {
      'app-userth': UserTh,
    }

  }
</script>

<style scoped>
  #content {
    background-color: #fff;
  }

  .photo-content {
    position: relative;
    height: 300px;
  }

  /*背景图片*/
  .background-pic {
    width: 100%;
    height: 300px;
    background: url('../assets/userPhoto/big-bg.jpeg') no-repeat center;
    background-size: cover;
    position: relative;
  }

  .chang-bg {
    /*margin-bottom: 10px;*/
    width: 150px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    background-color: rgba(192, 196, 204, 0.5);
    text-align: center;
    color: #fff;
    font-size: 19px;
    font-weight: normal;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    /*margin-right: 20px;*/
  }

  /*头像*/
  .user-pic {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -50px;
    left: 20px;
    background: url('../assets/userPhoto/user-head.png');
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  .photo-content > span {
    position: absolute;
    bottom: -40px;
    left: 130px;
    font-size: 24px;
  }

  .user-pic .chang-ushead {
    height: 25px;
    line-height: 25px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #f1f1f1;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  /*用户信息编辑按钮*/
  .chang-userInfo {
    position: absolute;
    width: 125px;
    right: 20px;
    bottom: -50px;
  }
</style>
