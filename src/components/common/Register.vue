<template>
  <div id="register">
    <el-row>
      <el-col :span="8">
        <el-form :model="registerInfo" status-icon :rules="rules2" ref="registerInfo" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item><p>乐享食间</p></el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input type="text" v-model="registerInfo.nickName" placeHolder="请输入昵称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNum">
            <el-input type="text" v-model="registerInfo.phoneNum" placeHolder="请输入手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passPwd">
            <el-input type="password" v-model="registerInfo.passPwd" placeHolder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="registerInfo.checkPwd" placeHolder="请确认密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRegister('registerInfo')">提交</el-button>
            <el-button @click="resetRegister('registerInfo')">重置</el-button>
            <br/>
            <router-link to="/login">已有账号?马上登录</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
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
        }  else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else {
          callback();
        }
      };
      return {
        registerInfo: {
          nickName: '',
          phoneNum: '',
          passPwd: '',
          checkPwd: '',
        },
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
        }
      };
    },
    methods: {
      submitRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:3000/register', {
              accountName:this.registerInfo.nickName,
              phoneNo:this.registerInfo.phoneNum,
              password:this.registerInfo.passPwd
            })
              .then((res)=> {
                // console.log(res);
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
      }
    }

  }
</script>

<style scoped>
  #register {
    position: relative;
  }

  #register .el-row {
    height: 300px;
  }

  #register .el-row .el-col {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0, -50%);
    transform: translateX(-50%);
  }

  #register .el-col p {
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    background-color: #ec5541;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  #register .el-col .el-form-item {
    text-align: center;
  }
</style>
