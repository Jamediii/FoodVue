<template>
  <div>
    <!--最新版本的 Bootstrap 核心 CSS 文件-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <nav class="navbar navbar-default ">
      <div class="container-fluid w">
        <!-- Brand and toggle get grouped for better mobile display -->
        <!--导航栏左边-->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link  class="navbar-brand" to="/">乐享食间</router-link>

        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/recipes">逛食谱</router-link>
            </li>
            <li>
              <router-link to="/recipecl/1">家常菜</router-link>
            </li>
            <li>
              <router-link to="/recipecl/2">煲汤</router-link>
            </li>
            <li>
              <router-link to="/recipecl/7">主食</router-link>
            </li>
            <li>
              <router-link to="/recipecl/8">精选</router-link>
            </li>
            <li>
              <router-link to="/community">享食社区</router-link>
            </li>
            <li>
              <router-link to="/user_recipe">达人推荐</router-link>
            </li>
          </ul>
          <!--导航栏右边-->
          <ul class="nav navbar-nav navbar-right">
            <li v-if="this.$store.state.isShow">
              <router-link to="/user">个人中心</router-link>
            </li>
            <li v-if="!this.$store.state.isShow">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-if="!this.$store.state.isShow">
              <router-link to="/register">注册</router-link>
            </li>
            <li style="margin-top: 15px;margin-left: 15px;" v-if="this.$store.state.isShow" class="navSetting">
              <el-dropdown>
                  <span class="el-dropdown-link" style="font-size:18px;">
                    <a href="javascript:void(0)"><i class="el-icon-setting"></i></a>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link to="/modifyinfo">修改资料</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="exitEdit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <!--搜索部分-->
    <el-row id="search">
      <div class="w">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <img src="../assets/Hlogo.png" width="100px" alt="">
        </el-col>
        <el-col class="myselect" :xs="4" :sm="3" :md="3" :lg="3" :xl="3" :offset="2">
          <select style="height:40px;width: 80%;border-radius: 4px;border-color:#dcdfe6;color:#606266;outline:none;"
                  name="" id="">
            <option value="按食谱名称">按食谱名称</option>
            <option value="按食谱作者">按食谱作者</option>
          </select>
        </el-col>
        <el-col class="inputSearch" :xs="7" :sm="8" :md="8" :lg="8" :xl="8">
          <el-input style="height: 40px;width: 100%;" v-model="inputsel" @keyup.native="searchMathing"
                    placeholder="请输入内容"/>
          <div v-if="showlist" class="searchList">
            <ul>
              <li @click="upText(o.name,o.id)" v-for="(o,index) in showMathing" v-if="index < showMathing.length">
                {{o.name}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-button @click="findRec">搜寻</el-button>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="1">
          <router-link to="/menu" class="right"><span style="background-color: #fff;"><i
            class="el-icon-edit"></i>写食谱</span>
          </router-link>
        </el-col>
      </div>
    </el-row>

    <router-view v-if="isRouterAlive" ></router-view>

  </div>
</template>

<script>
  $(function () {
    //添加选中样式
    $("nav.navbar-default .nav>li").click(function () {
      $("li").removeClass("active");
      $(this).addClass("active");
    });

  });
  export default {
    name: "Commonfixed",
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        inputsel: '',
        checkData: [],
        showMathing: [],
        showlist: false,
        recipeSearchId: 0,
        isRouterAlive:true,
      }
    },
    created() {
      this.$store.state.isShow = Boolean(localStorage.getItem("Flag") === 'isLogin')
    },
    mounted() {
      this.$axios.post('http://localhost:3000/recipes/find').then((res) => {
        // var sdata = res.data.data;
        // console.log(sdata);
        // var len = sdata.length;
        // for (var i = 0; i < len; i++) {
        //   this.rsNameBefore.push(sdata[i].recipeName);
        //   this.raNameBefore.push(sdata[i].accountName);
        // }
        this.checkData = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },

    methods: {
      reload(){
        this.isRouterAlive = false;
        //在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM
        this.$nextTick(()=>{
          this.isRouterAlive=true
        })
      },
      //退出登录
      exitEdit() {
        this.$store.state.user.state = false;
        this.$alert('登录退出', '是否退出登录', {
          confirmButtonText: '确定',
          callback: () => {
            localStorage.removeItem("Flag");
            localStorage.removeItem("userId");
            this.$store.state.isShow = false;
            this.$store.state.isLoginHide = true;
            this.$router.push("/");
          }
        });
      },
      //搜索匹配方法
      searchMathing() {
        // var len1 = this.rsNameBefore.length;
        // var len2 = this.raNameBefore.length;
        this.showMathing = [];
        // var reg = new RegExp(".*?" + this.inputsel + ".*?", "g");
        // if ($("#search .myselect select").val() == "按食谱名称") {
        //   for (let i = 0; i < len1; i++) {
        //     if (reg.test(this.rsNameBefore[i])) {
        //       this.showMathing.push(this.rsNameBefore[i]);
        //     }
        //   }
        // } else {
        //   for (let i = 0; i < len2; i++) {
        //     if (reg.test(this.raNameBefore[i])) {
        //       this.showMathing.push(this.raNameBefore[i]);
        //     }
        //   }
        // }

        var reg = new RegExp(".*?" + this.inputsel + ".*?", "g");
        if ($("#search .myselect select").val() == "按食谱名称") {
          for (let i = 0; i < this.checkData.length; i++) {
            if (reg.test(this.checkData[i].recipeName)) {
              this.showMathing.push({id: this.checkData[i].detailsId, name: this.checkData[i].recipeName});
            }
          }
        } else {
          for (let i = 0; i < this.checkData.length; i++) {
            if (reg.test(this.checkData[i].accountName)) {
              this.showMathing.push({id: this.checkData[i].userId, name: this.checkData[i].accountName});
            }
          }
        }

        if (!this.inputsel.length) {
          this.showMathing = [];
          this.showlist = false;
        } else {
          this.showlist = true;
        }

      },
      //将选择的下拉框内容，放到搜索框中
      upText(text, id) {
        this.inputsel = text;
        this.showlist = false;
        if ($("#search .myselect select").val() == "按食谱名称") {
          this.recipeSearchId = id;
        } else if ($("#search .myselect select").val() == "按食谱作者") {
          this.recipeSearchId = id;
        }
      },

      //单击搜寻按钮，找到相应的结果
      findRec() {
        if (this.recipeSearchId && $("#search .myselect select").val() == "按食谱名称") {
          //根据食谱ID跳转到相应的路由
          this.$router.push('/recipe_detail/' + this.recipeSearchId);
        } else if (this.recipeSearchId && $("#search .myselect select").val() == "按食谱作者") {
          //根据用户id跳转到用户相应的用户做的菜谱。。。。。
          this.$router.push("/fhuser/" + this.recipeSearchId);
        }
      },

    },


  }
</script>

<style scoped>
  /*导航栏部分开始*/
  nav.navbar-default {
    /*background-color: #fff;*/
    margin-bottom: 0;
    font-size:18px;
    color: #8cccc1;
    background: linear-gradient(to top, #daeae8 0%, #daeae800);
  }

  .navbar {
    border: 1px solid transparent;
    border-bottom-color: #daeae8;
  }
  .navbar-brand{
    font-size: 22px;
  }

  nav.navbar-default .navbar-nav > .active > a {
    /*color: #fff;*/
    /*background-color: #8cccc1;*/
    background: linear-gradient(to top, #daeae800 0%, #daeae8);
  }

  nav .ulDown {
    position: absolute;
    /*line-height: 30px;*/
    width: 200%;
    background-color: #fff;
    margin-top: 1px;
    z-index: 9999999;
  }

  nav .ulDown li {
    margin: 10px;
    text-align: center;
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
    border: 1px solid #ccc;
    height: 80px;
    line-height: 80px;

    width: 130px;
    text-align: center;
    margin-top: 20px;
  }

  #search .inputSearch {
    position: relative;
    height: 20px;
  }

  #search .inputSearch input {
    line-height: 62px;
  }

  #search .inputSearch .searchList {
    position: absolute;
    top: 82px;
    z-index: 99999;
    border: 1px solid #ccc;
    border-top-color: transparent;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }

  #search .inputSearch .searchList li {
    line-height: 24px;
    color: #333;
  }

  #search .inputSearch .searchList li:hover {
    background-color: #eee;
  }


  #search {
    padding: 10px 0;
    height: 144px;
    box-sizing: border-box;
    background-color: #daeae8;
  }

  #search {
    line-height: 144px;
  }

  /*搜索部分结束*/

</style>
