<template>
  <div id="bigBg">
    <div id="content" class="w">
      <div class="photo-content">
        <!--提交表单-->
        <form action="" id="Headportrait"></form>

        <!--背景图片-->
        <div>
          <div class="background-pic"></div>
        </div>

        <!--头像-->
        <div class="user-pic" :style="{backgroundImage: 'url('+userInfo.headPhoto+')'}"></div>
        <!--名字-->
        <span>{{ userInfo.accountName }}</span>
        <!--等级-->

      </div>

      <div style="margin-top: 80px">
        <app-userth :userid="userId"></app-userth>
      </div>
    </div>
  </div>
</template>

<script>
  import UserTh from './fhUser/UserTh';

  export default {
    name: "fhUser",
    data() {
      return {
        userInfo: {} // 用户的基本信息 --名字/头像/背景/经验/等级
      }
    },
    // methods: {
    // },
    // 页面加载后就去获取 -- 查看用户的信息
    created() {
      this.userId = this.$route.params.userId;
      this.$router.push(`/fhuser/${this.userId}/recipe`);
      // 获取用户基本信息
      this.$axios.get(`http://127.0.0.1:3000/users/${this.userId}`)
        .then((result) => {
          this.userInfo = result.data.data[0];
          console.log(this.userInfo);
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
