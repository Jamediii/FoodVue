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
          <!--:style="{backgroundImage: 'url('+userInfo.settingWall+')'}">-->
          <div class="background-pic">
            <img :src="userInfo.settingWall" width="100%" style="position: absolute; top: 0; bottom: 0; margin: auto 0"
                 alt="">
            <label for="user-bg">
              <transition name="el-fade-in-linear">
                <div v-show="showBgBtn" class="chang-bg">更换背景</div>
              </transition>
            </label>
          </div>
          <input type="file"
                 ref="userBg"
                 id="user-bg"
                 @change="changeBg('userBg','settingWall')"
                 style="display: none"
                 form="Headportrait">
        </div>

        <!--头像-->
        <div class="user-pic"
             @mouseenter="showHdBtn = !showHdBtn"
             @mouseleave="showHdBtn = !showHdBtn">
          <!--按钮显示-->
          <img :src="userInfo.headPhoto" width="100%" alt="">
          <label for="user-hd">
            <transition name="el-zoom-in-bottom">
              <div v-show="showHdBtn" class="chang-ushead">更换</div>
            </transition>
          </label>
        </div>
        <input type="file"
               id="user-hd"
               ref="userHd"
               @change="changeBg('userHd','headPhoto')"
               style="display: none" form="Headportrait">
        <!--名字-->
        <span>{{userInfo.accountName}}</span>
        <!--等级-->
        <!--经验-->

        <!--去用户修改页面-->
        <router-link to="/modifyinfo">
          <el-button class="chang-userInfo">编辑</el-button>
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
        basicHead: '', // 基础头像
        basicWall: '', // 基础背景图片
        showBgBtn: '', // 大背景更改按钮显示/隐藏
        showHdBtn: '', // 头像更改按钮显示/隐藏
        userId: '', // 我的id
        userInfo: {
          headPhoto: '',
          settingWall: ''
        } // 用户的基本信息 --名字/头像/背景/经验/等级
      }
    },
    // methods: {
    // },
    // 页面加载后就去获取 -- 查看自己的信息
    created() {
      this.$router.push('/user/recipe');
      this.userId = localStorage.getItem('userId');
      let userId = this.userId;
      this.$axios.get(`${$LH.url}/users/${userId}`)
        .then(async (result) => {
          this.userInfo = await result.data.data[0];
        }).catch(err => {
        console.log(err);
      });
      // 加载基本图片
      this.$axios.get(`${$LH.url}/recipes/basicPhoto`)
        .then(async result => {
          console.log(result.data.data);
          this.basicHead = await result.data.data.userHeadPhoto;
          this.basicWall = await result.data.data.userSettingWall;
          if (!this.userInfo.headPhoto) {
            this.userInfo.headPhoto = this.basicHead.replace(':', ':/');
          }
          if (!this.userInfo.settingWall) {
            this.userInfo.settingWall = this.basicWall.replace(':', ':/');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    components: {
      'app-userth': UserTh,
    },
    methods: {
      // 预览 + 上传
      changeBg(inputName, fileSrc) {
        if (typeof FileReader == 'undefined') {
          this.$notify.error({
            title: '错误',
            message: "抱歉，你的浏览器不支持FileReader"
          });
          return false;
        }
        var simpleFile = this.$refs[inputName].files[0];
        if (!/image\/\w+/.test(simpleFile.type)) {
          this.$notify.error({
            title: '错误',
            message: "请确保文件类型为图像类型"
          });
          return false;
        }
        if (simpleFile.size / 1024 / 1024 > 3) {
          this.$message.error('上传图片大小不能超过 3MB(￣▽￣)"!');
          return false;
        }
        let reader = new FileReader();
        let _this = this;
        // 将文件以Data URL形式进行读入页面-- 转base64位
        reader.readAsDataURL(simpleFile);
        reader.onload = function (e) {
          console.log(fileSrc);
          _this.userInfo[fileSrc] = this.result;
        };
        // 图片上传
        if (fileSrc === 'settingWall') {
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId')); // id
          formData.append('file', simpleFile); // 图片
          this.$axios({
            method: 'post',
            url: `${$LH.url}/users/setting/headPhoto`,
            data: formData
          }).then((result) => {
            this.$message({
              message: '上传成功!',
              type: 'success'
            });
          });
        } else {
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId')); // id
          formData.append('file', simpleFile); // 图片
          this.$axios({
            method: 'post',
            url: `${$LH.url}/users/setting/settingWall`,
            data: formData
          }).then((result) => {
            this.$message({
              message: '上传成功!',
              type: 'success'
            });
          });
        }
      }
    },
  }
</script>

<style scoped>
  #content {
    background-color: #fff;
  }

  .photo-content {
    position: relative;
    height: 400px;
  }

  /*背景图片*/
  .background-pic {
    width: 100%;
    height: 400px;
    overflow: hidden;
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
    /*background: url('../assets/userPhoto/user-head.png');*/
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
