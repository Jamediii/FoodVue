<template>
  <!--菜谱分类列表详情-->
  <div id="recipeCList" class="w">
    <el-row class="innerRCL" :gutter="20">
      <el-col class="rclLeft" :span="14">
        <el-card shadow="always" v-for="(o,index) in recipeClassOne" :key="index">
          <router-link :to="`/recipe_detail/${o.detailsId}`">
            <el-col :span="10">
              <img :src="o.recipeCoverImg" alt="">
            </el-col>
            <el-col :span="14">
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
      <el-col class="rclRight" :span="6" :offset="1">
        <div class="grid-content">
          <h3>作者推荐</h3>
          <el-card class="box-card" v-for="(o,index) in recipeClassOne" :key="index" v-if="index <5">
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
    <!--<el-row :gutter="20">-->
    <!--<el-col :span="12" :offset="5">-->
    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <!--<div class="block">-->
    <!--<el-pagination-->
    <!--@current-change="currentPageNum" :current-page="currentPage"-->
    <!--:page-size="pageSize" layout="prev, pager, next" :total="len">-->
    <!--</el-pagination>-->
    <!--</div>-->
    <!--&lt;!&ndash;current-change当前页变动时候触发的事件&ndash;&gt;-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--<app-pagenation ref="c1" :aldata = "fData"></app-pagenation>-->
  </div>
</template>

<script>
  // 导入分页组件
  // import PageNation from '../common/PageNation.vue'
  export default {
    name: "recipeClassList",
    data() {
      return {
        recipeClassOne: [],//所有的数据
        // fData:{}
        // articleInfoList: [],//每页显示的数据
        // currentPage: 1,//当前页
        // len: 0,//默认总的数据长度
        // pageSize: 5,//默认每页显示的数量
      }
    },

    mounted() {
      //根据id获取分类下的菜谱
      this.$axios.get("http://localhost:3000/recipes/classify/" + this.$route.params.recipeClassifyId)
        .then((res) => {
          this.recipeClassOne = res.data.data;
          console.log(this.recipeClassOne);
          // this.len = res.data.data.length;
          // this.handleInfo();
        }).catch((err) => {
        console.log(err);
      })
    },
    watch: {
      $route() {
        //根据id获取分类下的菜谱
        this.$axios.get("http://localhost:3000/recipes/classify/" + this.$route.params.recipeClassifyId)
          .then((res) => {
            this.recipeClassOne = res.data.data;
            console.log(this.recipeClassOne);
            // this.len = res.data.data.length;
            // this.handleInfo();
          }).catch((err) => {
          console.log(err);
        })
      }
    },
    // methods:{
    //   handleInfo() {
    //     // 页数，如果有小数，只取整数部分
    //     let pageNum = Number(String(this.len / this.pageSize).split(".")[0]);
    //     // 定义一个空数组
    //     let newArr = [];
    //     // 遍历获取的数据，每次遍历都从数组的0位置开始截取，截取数量为每页显示的数量
    //     for (let i = 0; i < pageNum; i++) {
    //       newArr.push(this.recipeClassOne.splice(0, this.pageSize));
    //     }
    //     // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
    //     if (this.recipeClassOne.length < this.pageSize) {
    //       newArr.push(this.recipeClassOne.splice(0, this.recipeClassOne.length));
    //     }
    //     // 将新的数组赋给articleList[],用来渲染页面
    //     this.recipeClassOne = newArr;
    //     // 第一次进入页面显示this.articleList[]数组的第一个元素
    //     this.articleInfoList = this.recipeClassOne[0]
    //     console.log(this.recipeClassOne[0])
    //   },
    //   currentPageNum(currentPage) {
    //     // currentPage为当前的页数
    //     // 显示当前页数对应的数据
    //     this.articleInfoList = this.recipeClassOne[currentPage - 1];
    //   },
    // },

    components: {
      // 'app-pagenation':PageNation
    }
  }
</script>

<style scoped>

  #recipeCList .rclLeft, #recipeCList .rclRight {
    margin-top: 20px;
  }

  #recipeCList .rclLeft img {
    height: 200px;
    width: 100%;
  }

  #recipeCList .rclLeft .el-col p span {
    color: #FF7979;
  }

  #recipeCList .rclLef p.rclBrief {
    /*显示行数*/
  }

  #recipeCList .rclRight h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: block;
    background-color: #fae8c8;
  }

  #recipeCList .rclRight img {
    height: 80px;
    width: 100%;
    margin-bottom: 20px;
  }
</style>
