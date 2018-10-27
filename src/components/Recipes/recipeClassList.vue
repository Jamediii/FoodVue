<template>
  <!--<link rel="stylesheet" type="text/css" href="../../../static/css/style.css" />-->
  <!--菜谱分类列表详情-->
  <div id="recipeCList"  class="w">
    <p style="height:20px;"></p>
    <div>
    <el-row :gutter="20">
      <!--右侧菜谱部分-->
      <el-col :span="18">
        <el-header>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}</el-header>
        <el-main style="padding:0">
          <el-row class="innerRCL" >
            <el-col class="rclLeft" >
              <el-card style="border:1px solid transparent;border-bottom-color:#ccc;padding:0; " shadow="never"  v-for="(o,index) in articleInfoList" :key="index">
                <router-link :to="`/recipe_detail/${o.detailsId}`">
                  <el-col :span="8">
                    <img :src="o.recipeCoverImg" alt="">
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <h3>{{o.recipeName}}</h3>
                    <p style="
                     display: -webkit-box;
                      white-space: pre-wrap;
                      word-wrap: break-word;
                      overflow: hidden;
                      text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp:4;margin-top:20px;"
                       class="rclBrief">{{o.recipeBrief}}</p>
                    <p>
                      <span class="glyphicon glyphicon glyphicon-user"></span>{{o.accountName}}
                      <span class="glyphicon glyphicon glyphicon-heart"></span>{{o.recipePraiseNum}}
                    </p>
                  </el-col>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
          <!--分页功能-->
          <el-row :gutter="20">
            <el-col :span="12" :offset="5">
              <!--分页-->
              <div class="block">
                <el-pagination
                  @current-change="currentPageNum" :current-page="currentPage"
                  :page-size="pageSize" layout="prev, pager, next" :total="len">
                </el-pagination>
              </div>
              <!--current-change当前页变动时候触发的事件-->
            </el-col>
          </el-row>
        </el-main>
      </el-col>
      <!--右侧文章作者推荐-->
      <el-col class="rclRight" :span="6"  >
        <div class="grid-content">
          <h3>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}作者推荐</h3>
          <el-card shadow="never" class="box-card" v-for="(o,index) in articleInfoList" :key="index" v-if="index <5">
            <div class="text item">
              <el-col :span="10">
                <img :src="o.headPhoto" alt="">
              </el-col>
              <el-col :span="10">
                <p>{{o.accountName}}</p>
              </el-col>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
  // 导入分页组件
  // import PageNation from '../common/PageNation.vue'

  export default {
    name: "recipeClassList",
    components:{

    },
    data() {
      return {
        recipeClassOne: [],//所有的数据
        fData: [],
        articleInfoList: [],//每页显示的数据
        currentPage: 1,//当前页
        len: 0,//默认总的数据长度
        pageSize: 5,//默认每页显示的数量
        recipeClassName:"",//菜谱分类对应的名称
      }
    },

    mounted() {
      //根据id获取分类下的菜谱
      this.$axios.get(`${$LH.url}/recipes/classify/${this.$route.params.recipeClassifyId}`)
        .then((res) => {
          this.recipeClassOne = res.data.data;
          this.recipeClassName=this.recipeClassOne[0].recipeClassifyName;
          this.fData = res.data.data;
          // console.log(this.recipeClassOne);
          this.len = res.data.data.length;
          this.handleInfo();
        }).catch((err) => {
        console.log(err);
      })

    },
    watch: {
      $route() {
        //根据id获取分类下的菜谱
        this.$axios.get(`${$LH.url}/recipes/classify/${this.$route.params.recipeClassifyId}`)
          .then((res) => {
            this.recipeClassOne = res.data.data;
            this.recipeClassName=this.recipeClassOne[0].recipeClassifyName;
            // console.log(this.recipeClassOne);
            this.len = res.data.data.length;
            this.handleInfo();
          }).catch((err) => {
          console.log(err);
        })
      }
    },
    methods: {
      handleInfo() {
        // 页数，如果有小数，只取整数部分
        let pageNum = Number(String(this.len / this.pageSize).split(".")[0]);
        // 定义一个空数组
        let newArr = [];
        // 遍历获取的数据，每次遍历都从数组的0位置开始截取，截取数量为每页显示的数量
        for (let i = 0; i < pageNum; i++) {
          newArr.push(this.recipeClassOne.splice(0, this.pageSize));
        }
        // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
        if (this.recipeClassOne.length < this.pageSize) {
          newArr.push(this.recipeClassOne.splice(0, this.recipeClassOne.length));
        }
        // 将新的数组赋给articleList[],用来渲染页面
        this.recipeClassOne = newArr;
        // 第一次进入页面显示this.articleList[]数组的第一个元素
        this.articleInfoList = this.recipeClassOne[0]
        console.log(this.recipeClassOne[0])
      },
      currentPageNum(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.articleInfoList = this.recipeClassOne[currentPage - 1];
      },
    },

    components: {
      // 'app-pagenation':PageNation
    }
  }
</script>


<style scoped>
  #recipeCList .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    color:#fff;
  }

  #recipeCList .rclLeft img {
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
  }

  #recipeCList .rclLeft .el-col p span {
    color: #FF7979;
  }

  #recipeCList .rclRight h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: block;
    font-size: 16px;
    font-weight: normal;
    padding:0 20px;
    background-color: #8cccc1;
    color:#fff;
    margin-top: 0;
    margin-bottom: 20px;
  }

  #recipeCList .rclRight img {
    height: 80px;
    width: 100%;
    margin-bottom: 20px;
  }

</style>
