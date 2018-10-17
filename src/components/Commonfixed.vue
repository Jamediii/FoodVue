<template>
  <div>
    <!--导航栏部分-->
    <el-row id="nav">
      <el-col :xs="12" :sm="14" :md="14" :lg="18" :xl="18">

        <el-menu :default-active="this.$router.path" router
                 class="el-menu-demo "
                 background-color="#FAE8C8"
                 text-color="#333333"
                 active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/" @click="isShow=true">乐享食间首页</el-menu-item>
          <el-menu-item index="11" width="10px" disabled><span>|</span></el-menu-item>
          <el-menu-item index="/recipes" @click="isShow=false">逛食谱
            <i class="el-icon-arrow-down"></i>
          </el-menu-item>
          <el-menu-item index="11" width="10px" disabled><span>|</span></el-menu-item>
          <el-menu-item index="/community" @click="isShow=false">享食社区<i class="el-icon-arrow-down"></i></el-menu-item>
        </el-menu>

      </el-col>
      <el-col class="topright"  :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
        <el-menu :default-active="this.$router.path" router
                 class="el-menu-demo"
                 background-color="#FAE8C8"
                 text-color="#333333"
                 active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/user">{{name}}</el-menu-item>
          <el-menu-item index="/login">{{loginState}}</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>

          <!--设置部分-->
          <el-dropdown class="w setting">
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toEdit">修改资料</el-dropdown-item>
              <el-dropdown-item @click.native="exitEdit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>
      </el-col>

    </el-row>

    <!--首页应该出现的部分-->
    <el-row id="projTitle" v-if="isShow">
      <el-col :offset="7" :xs="2" :sm="4" :md="3" :lg="5" :xl="5">
        <img src="../assets/Hlogo.png" width="100px" alt="">
      </el-col>
      <el-col :xs="15" :sm="13" :md="14" :lg="12" :xl="12">
        <span>享受厨房小事</span>
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
        <router-link to="/makemn"><span><i class="el-icon-edit"></i>写食谱</span></router-link>
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
        isShow: true,
        // loginState:"登录"
      }
    },
    mounted() {
      if (this.$router.path == '/') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    methods: {
      toEdit() {
        this.$router.push("/user/edit");
      }
    },
    computed: {
      name() {
        if (this.$store.state.user.state) {
          return "去我的页面"
        }
      },
      loginState() {
        if (this.$store.state.user.state) {
          return "欢迎" + this.$store.state.user.name;
        } else {
          return "登录";
        }
      },
      exitEdit() {
        return this.$store.state.user.state = false;
      }
    }
  }
</script>

<style scoped>
  /*导航栏部分开始*/
  #nav {
    background-color: #FAE8C8;
  }

  #nav ul.el-menu {
    border-bottom-color: #f9d422;
  }

  #nav .topright .setting {
    width: 40px;
    line-height: 60px;
  }

  /*导航栏部分结束*/
  /*搜索部分开始*/
  #search {
    min-width: 768px;
  }

  #search .el-col {
    line-height: 124px;
  }

  #search .el-col:last-child span {
    display: inline-block;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    height: 80px;
    line-height: 80px;
    width: 130px;
    text-align: center;
    margin-top: 20px;
  }

  /*搜索部分结束*/

  /*与搜索栏替换的标题部分开始*/
  #search, #projTitle {
    padding: 10px 0;
    height: 144px;
    box-sizing: border-box;
    background-color: #FAE8C8;
  }

  #search, #projTitle .el-col span {
    line-height: 144px;
  }

  #projTitle .el-col span {
    font-size: 50px;
    font-family: "楷体";
  }

  /*与搜索栏替换的标题部分结束*/
</style>
