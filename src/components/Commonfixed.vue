<template>
  <div>
    <!--导航栏部分-->
    <el-row id="nav">
      <el-col :span="24">
        <el-menu :default-active="this.$router.path" router
                 class="el-menu-demo "
                 background-color="#FAE8C8"
                 text-color="#333333"
                 active-text-color="#ffd04b" mode="horizontal">
          <el-menu-item index="/" @click="isShow=true">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">乐享食间首页</el-col>
          </el-menu-item>
          <el-menu-item index="11" disabled width="10px">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"><span>|</span></el-col>
          </el-menu-item>
          <el-menu-item index="/recipes" @click="isShow=false">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              <el-dropdown>
                <span class="el-dropdown-link">
                  逛食谱<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/recipecl/1">
                    <el-dropdown-item>家常菜</el-dropdown-item>
                  </router-link>
                  <router-link to="/recipecl/2">
                    <el-dropdown-item>西餐</el-dropdown-item>
                  </router-link>
                  <router-link to="/recipecl/3">
                    <el-dropdown-item>烘焙</el-dropdown-item>
                  </router-link>
                </el-dropdown-menu>
              </el-dropdown>
              <!--逛食谱<i class="el-icon-arrow-down"></i>-->
            </el-col>
          </el-menu-item>
          <el-menu-item index="11" disabled width="10px">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"><span>|</span></el-col>
          </el-menu-item>
          <el-menu-item index="/community" @click="isShow=false">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              <el-dropdown>
                <span class="el-dropdown-link">
                  享食社区<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>文章集锦</el-dropdown-item>
                  <el-dropdown-item>达人推荐</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-menu-item>
          <div class="right">
            <el-menu-item class="right" index="/">
              <!--设置部分-->
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                <el-dropdown class="setting">
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toEdit">修改资料</el-dropdown-item>
                    <el-dropdown-item @click.native="exitEdit">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-menu-item>
            <el-menu-item index="/register" class="right">
              <el-col v-show="!this.$store.state.user.state" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">注册</el-col>
            </el-menu-item>
            <el-menu-item index="/login" class="right">
              <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="3">{{loginState}}</el-col>
            </el-menu-item>
            <el-menu-item index="/user" class="right">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div>{{name}}</div>
              </el-col>
            </el-menu-item>
          </div>
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
      <el-col  class="myselect" :xs="4" :sm="3" :md="3" :lg="3" :xl="3">
        <select style="height:40px;width: 80%;" name="" id="">
          <option value="按食谱名称">按食谱名称</option>
          <option value="按食谱作者">按食谱作者</option>
        </select>
      </el-col>
      <el-col class="inputSearch" :xs="7" :sm="8" :md="8" :lg="8" :xl="8">
        <input style="height: 40px;width: 100%;" v-model="inputsel" @keyup="searchMathing" placeholder="请输入内容"/>
        <div v-if="showlist" class="searchList">
          <ul>
            <li @click="upText(o.name,o.id)" v-for="(o,index) in showMathing" v-if="index <= showMathing.length">
              {{o.name}}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <el-button @click="findRec">搜寻</el-button>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <router-link to="/menu"><span style="background-color: #fff;"><i class="el-icon-edit"></i>写食谱</span></router-link>
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
        inputsel: '',
        isShow: true,
        // loginState:"登录"
        checkData: [],
        // raNameBefore: [],
        showMathing: [],
        // rsNameBefore: [],
        showlist: false,
        recipeSearchId: 0
      }
    },
    mounted() {
      if (this.$route.path == '/') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
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
      })


    },
    methods: {
      toEdit() {
        this.$router.push("/user/edit");
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
          //根据用户ID获取到用户相应的菜谱
          this.$axios.post('http://localhost:3000/recipes/findbyuid', {
            userId: id
          }).then((res) => {
            console.log(res+"......");
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      //退出登录
      exitEdit() {
        if (this.$store.state.user.state) {
          this.$store.state.user.state = false;
        }
        // return this.$store.state.user.state = false;
      },
      //单击搜寻按钮，找到相应的结果
      findRec() {
        if (this.recipeSearchId && $("#search .myselect select").val() == "按食谱名称") {
          //根据食谱ID跳转到相应的路由
          this.$router.push('/recipe_detail/' + this.recipeSearchId);
        } else if (this.recipeSearchId && $("#search .myselect select").val() == "按食谱作者") {
          //根据用户id跳转到用户相应的用户做的菜谱。。。。。
        }

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

    },

  }
</script>

<style scoped>
  /*导航栏部分开始*/
  #nav {
    background-color: #FAE8C8;
  }

  #nav .el-menu {
    border-bottom-color: #f9d422;
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
    z-index: 999999;
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

  /*搜索部分结束*/

  /*与搜索栏替换的标题部分开始*/
  #search, #projTitle {
    padding: 10px 0;
    height: 144px;
    box-sizing: border-box;
    background-color: #FAE8C8;
  }

  #search, #projTitle .el-col > span {
    line-height: 144px;
  }

  #projTitle .el-col > span {
    font-size: 50px;
    font-family: "楷体";
  }

  /*与搜索栏替换的标题部分结束*/
</style>
