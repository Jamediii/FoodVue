<template>
  <!--登录-->
  <div id="login">
    <div class="w">
      <el-row>
        <el-col :span="8" :offset="1">
          <div>
            <img src="../../assets/login.png" alt="">
          </div>
        </el-col>
        <el-col :span="9" :offset="15">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>登录</span>
              <span class="right"><router-link to="/register">去注册>></router-link></span>
            </div>
            <div class="text item loginBox">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" style="padding:15px"
                       class="demo-ruleForm">
                <el-form-item label="" prop="pass">
                  <el-input type="text" v-model="ruleForm2.pass" placeHolder="请输入手机号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" placeHolder="请输入密码"
                            autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button class="left" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                  <el-button class="right" type="primary" @click="resetForm('ruleForm2')">重置</el-button>
                  <br/>
                  <!--<router-link to="/register">还没有账号?免费注册</router-link>-->
                </el-form-item>

              </el-form>
              <P style="font-size:16px;">使用第三方登录></P>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
      };
    },
    methods: {
      submitForm() {
        this.$axios.post(`${$LH.url}/login`, {
          userPNo: this.ruleForm2.pass,
          userPwd: this.ruleForm2.checkPass
        })
          .then((res) => {
            if (res.data.data.state) {
              this.$store.state.user = res.data.data;
              this.$store.state.isShow = true;
              localStorage.setItem("userId", res.data.data.userId);
              localStorage.setItem('Flag', "isLogin");
              this.$router.replace('/');
            } else {
              this.$alert('用户名或者验证码错误！！', '登录失败', {
                confirmButtonText: '确定',
              });

              function fixHeight() {
                var headerHeight = $("#switcher").height();
                $("#iframe").attr("height", $(window).height() - 54 + "px");
              }
              $(window).resize(function () {
                fixHeight();
              }).resize();

              $('.icon-monitor').addClass('active');

              $(".icon-mobile-3").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width-3');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
              });

            }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #login {
    position: relative;
    background-color: #f8f8f7;
  }

  #login .el-row {
    height: 600px;
    /*line-height: 600px;*/

  }

  #login .el-row .clearfix span {
    font-size: 16px;
  }

  #login .el-row .clearfix span > a {
    color: #3ea000;
  }

  #login .box-card {
    background-color: #fff;
  }

  #login .box-card .el-form-item{
    clear:both;
  }
  #login .box-card .el-button {

    background-color: #87d6c8;
    border:0;
    width: 45%;
    color: #fff;
  }

  #login .el-row .el-col {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  #login .el-col p {
    text-align: center;
    /*width: 100px;*/
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    /*background-color: #ec5541;*/
    margin: 0 auto;
    margin-bottom: 20px;
  }

  #login .el-col .el-form-item {
    text-align: center;
  }
</style>
