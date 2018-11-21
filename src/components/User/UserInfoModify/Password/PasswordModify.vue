<template>
  <div class="modify-user">

    <el-row>
      <el-col :span="16" :offset="4">
        <el-steps :active="active" finish-status="success" simple style="margin-top: 10px;margin-bottom: 40px">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
        </el-steps>

        <!--确认老密码-->
        <el-form v-if="active===0" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="16" :offset="4">
              <el-form-item label="老密码确认:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>



        <!--修改密码-->
        <el-form v-if="active===1" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="16" :offset="4">
              <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="4">
              <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="4">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-button v-if="active!=1" style="margin-top: 12px;" @click.native="next">下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PasswordModify",
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
        userId: localStorage.getItem('userId'),
        active: 0,
        url: {
        //  密码校验
          checkPassUrl: `${$LH.url}/login`,
        },

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
        }
      };
    },
    props:['userid'],
    methods: {
      next() {
        let _this = this;
        // if (this.active++ > 1) this.active = 2;
        if (this.active === 0) {
          this.$axios({
            method: 'post',
            url: _this.url.checkPassUrl,
            data:{
              userPNo: _this.userId,
              userPwd: _this.ruleForm2.pass
            }
          }).then(result=>{
            console.log(result);
            if (result.data.data.state) {
              _this.active++;
              _this.ruleForm2.pass = '';
            }else {
              _this.$message.error('密码校验错误,请重新输入');
            }
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: `${$LH.url}/register/update`,
              data: {
                id: this.userId,
                password: this.ruleForm2.pass
              }
            }).then(()=> {
              this.$message({
                message: '恭喜你，密码修改成功',
                type: 'success'
              });
              this.$router.push('user/recipe');
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .modify-user {
    padding: 100px;
    width: 100%;
    height: 600px;
    background-color: #fff;
  }
</style>
