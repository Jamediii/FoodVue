<template>
  <div id="forgitPwd">
    <div class="  fpTop">
      <div class="w">
        <img src="../../assets/Hlogo.png" alt="">
        <span>爱上制作美食</span>
      </div>

    </div>
    <el-row id="fpmain" :style="`height:${Screenheight}px`" class="w">
      <el-col :span="18" :offset="3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>找回密码</span>
            <span class="right">已有账号，<router-link style="color:#3ea000;" to="/login">直接登录>></router-link></span>
          </div>
          <div class="text item">
            <el-col style="margin-top: 40px" :span="10" :offset="7">
              <el-input v-model="fpinput" placeholder="请输入注册时填写的手机号码"></el-input>
              <el-button @click="getbackPwd" style="background-color: #87d6c8;width:100%;">提交</el-button>
            </el-col>

          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "ForgetPwd",
    data() {
      return {
        Screenheight: window.screen.availHeight - 90,
        fpinput:"",
      }
    },
    methods:{
      getbackPwd(){
        this.$message('功能正在加紧完善哟');
      }
    }
  }
</script>

<style scoped>
  #forgitPwd {
    background-color: #f8f8f7;

  }

  #forgitPwd .fpTop {
    height: 90px;
    background-color: #fff;
  }

  #forgitPwd .fpTop img {
    width: 80px;
  }

  #forgitPwd #fpmain {
    margin-top: 100px;
    position: relative;
    height: 400px;
  }

  #forgitPwd #fpmain .el-col {
    /*position: absolute;*/
    /*top: 50%;*/
    /*transform: translate(0, -50%);*/
  }

  #forgitPwd #fpmain .box-card .clearfix {
    font-size: 20px;
  }

  #forgitPwd #fpmain .box-card .el-button {

    margin:40px 0;
  }
</style>
