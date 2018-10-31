<template>
  <div id="register">
    <div class="w animated fadeInLeft ">
      <el-row :style="`height:${screenHeightr}px;`">
        <el-col :span="8" :offset="12">
          <div>
            <img src="../../assets/login.png" alt="">
          </div>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="titleStyle">新用户注册</span>
              <span class="right titleStyle ">已有账号，<router-link class="a-color" to="/login">直接登录>></router-link></span>
            </div>
            <div class="text item">
              <el-form :model="registerInfo" status-icon :rules="rules2" ref="registerInfo"
                       class="demo-ruleForm">
                <!--<el-form-item><p>乐享食间</p></el-form-item>-->
                <el-form-item label="" prop="nickName">
                  <el-input type="text" v-model="registerInfo.nickName" placeHolder="请输入昵称"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="phoneNum">
                  <el-input type="text" v-model="registerInfo.phoneNum" placeHolder="请输入手机号"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="passPwd">
                  <el-input type="password" v-model="registerInfo.passPwd" placeHolder="请输入密码"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPwd">
                  <el-input type="password" v-model="registerInfo.checkPwd" placeHolder="请确认密码"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="VeriCode">
                  <el-input style="width: 45%" type="text" v-model="registerInfo.VeriCode" placeHolder="请输入验证码"
                            autocomplete="off"></el-input>
                  <el-button type="primary" @click="checkVeriCode" style="width: 45%" class="right">获取验证码</el-button>
                </el-form-item>
               <div class="agreen">
                  <input type="checkbox" v-model="beSureReg">
                  我已经阅读并且同意，
                  <router-link style="color:#337ab7" to="/regagreement">乐享美食注册协议</router-link>
                </div>
                <br/>
                <el-form-item>
                  <el-button class="left" type="primary" @click="submitRegister('registerInfo')">提交</el-button>
                  <!--<el-button class="right" type="primary" @click="resetRegister('registerInfo')">重置</el-button>-->
                  <br/>
                  <!--<router-link to="/login">已有账号?马上登录</router-link>-->
                </el-form-item>

              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>

  export default {
    name: "Register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 6){
          callback(new Error('密码长度不能低于6位'));
        }else{
          if (this.registerInfo.checkPwd !== '') {
            this.$refs.registerInfo.validateField('checkPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerInfo.passPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else if (value.length != 11) {
          callback(new Error('手机号码格式不正确'));
        } else {
          callback();
        }
      };
      var validatePass5 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (value != 654654) {
          callback(new Error('验证码输入不正确'));
        } else {
          callback();
        }
      };
      return {
        screenHeightr: window.screen.availHeight,
        registerInfo: {
          nickName: '',
          phoneNum: '',
          passPwd: '',
          checkPwd: '',
          VeriCode: '',
          checkVeriState: '',

        },
        beSureReg: false,
        rules2: {
          passPwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPwd: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          nickName: [
            {validator: validatePass3, trigger: 'blur'}
          ],
          phoneNum: [
            {validator: validatePass4, trigger: 'blur'}
          ],
          VeriCode: [
            {validator: validatePass5, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.registerInfo.checkVeriState == 200 && this.beSureReg) {
            this.$axios.post(`${$LH.url}/register`, {
              accountName: this.registerInfo.nickName,
              phoneNo: this.registerInfo.phoneNum,
              password: this.registerInfo.passPwd
            })
              .then((res) => {

                this.$alert('注册成功！！', '注册信息', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.push('/login');
                  }
                });

              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetRegister(formName) {
        this.$refs[formName].resetFields();
      },
      checkVeriCode() {
        this.$axios.get(`/proxy/sms/send?mobile=${this.registerInfo.phoneNum}&tpl_id=106586&tpl_value=%23code%23%3D654654&key=2efeb60a5c3d4239e00c7652af986f9c`)
          .then((res) => {
            this.registerInfo.checkVeriState = res.status;
            console.log(res.status);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

  }
</script>

<style scoped>
  #register {
    position: relative;
    background-color: #f8f8f7;
  }

  .titleStyle {
    font-size: 16px;

  }

  #register .box-card {
    padding: 15px;
    background-color: #fff;
  }

  #register .box-card .el-button {
    background-color: #87d6c8;
    border: 0;
    width: 100%;
    color: #fff;
  }

  .a-color {
    color: #3ea000;
  }

  #register .logoPic img {
    width: 10%;
  }

  #register .el-row .el-col {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  #register .el-col p {
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    /*background-color: #ec5541;*/
    margin: 0 auto;
    margin-bottom: 20px;
  }

  #register .el-col .el-form-item .el-input {
    /*text-align: center;*/
    width: 100%;
  }

  #register .el-col .el-form-item .agreen{
    font-size: 14px;
  }
</style>
