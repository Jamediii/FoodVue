<template>
  <!--登录-->
  <div id="login">
    <el-row>
      <el-col :span="8">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item><p>乐享食间</p></el-form-item>
          <el-form-item label="手机号" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" placeHolder="请输入手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" placeHolder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button  @click="resetForm('ruleForm2')">重置</el-button>
            <br/>
            <router-link to="/register">还没有账号?免费注册</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
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
        result:{}
      };
    },
    methods: {
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.$axios.post('http://localhost:3000/login', {
          userPNo: this.ruleForm2.pass,
          userPwd: this.ruleForm2.checkPass
        })
          .then((res)=> {
            this.result=res.data.data;
            if(this.result.state){
              this.$emit('userName',this.result.name);
              this.$router.push('/');
            }else{
              alert("登录失败！用户名或者验证码错误");
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
  }

  #login .el-row {
    height: 400px;
  }

  #login .el-row .el-col {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0, -50%);
    transform: translateX(-50%);
  }

  #login .el-col p {
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    background-color: #ec5541;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  #login .el-col .el-form-item{
    text-align: center;
  }
</style>
