<template>
  <div>
    <!--导航栏部分-->
    <el-row class="w" id="nav">
      <el-col :span="18">
        <el-menu :default-active="this.$router.path" router
                 class="el-menu-demo"
                 background-color="#fff"
                 text-color="#333333"
                 active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/"  @click="isShow=true">乐享食间首页</el-menu-item>
          <el-menu-item index="11" width="10px" disabled><span>|</span></el-menu-item>
          <el-menu-item index="/recipes" @click="isShow=false">逛食谱<i class="el-icon-arrow-down"></i></el-menu-item>
          <el-menu-item index="11" width="10px" disabled><span>|</span></el-menu-item>
          <el-menu-item index="/community">享食社区<i class="el-icon-arrow-down"></i></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <el-menu :default-active="this.$router.path" router
                 class="el-menu-demo"
                 background-color="#fff"
                 text-color="#333333"
                 active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/user" >去我的界面</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <!--首页应该出现的部分-->
    <el-row id="projTitle" v-if="isShow">
      <el-col :offset="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
      <img src="../assets/Hlogo.png" width="100px" alt="">
      </el-col>
      <el-col :offset="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <h2></h2>
      </el-col>
    </el-row>

    <!--搜索部分-->
    <el-row id="search" v-else="isShow">
      <el-col :offset="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <img src="../assets/Hlogo.png" width="100px" alt="">
      </el-col>
      <el-col :xs="4" :sm="3" :md="3" :lg="3" :xl="3">
        <select name="" id="">
          <option value="按食品名称">按食品名称</option>
          <option value="按作者">按作者</option>
        </select>
      </el-col>
      <el-col :xs="7" :sm="8" :md="8" :lg="8" :xl="8">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <el-button>搜寻</el-button>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <router-link to="/makemn">写食谱</router-link>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Commonfixed",
    data() {
      return {
        input: '',
        isShow:true
      }
    },

  }
</script>

<style scoped>
  #nav ul.el-menu {
    border-bottom-color: #f9d422;
    box-sizing: border-box;
  }
  #search{
    min-width: 768px;
  }
  #search .el-col{
    line-height: 124px;
  }


</style>
