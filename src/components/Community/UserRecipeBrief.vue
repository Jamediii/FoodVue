<template>
  <div id="container">
    <el-row :gutter="10">
      <el-container v-for="(item,index) in infoList" :key="index">
        <el-aside width="310px">
          <br/>
          <img :src=item.dietPhoto>
        </el-aside>
        <el-container>
          <el-header>
            <div class="triangle"></div>
            <!--跳转路由是/article_detail/articleId，其中articleId是item.articleId，怎么实现拼接？-->
            <router-link :to="{path:'/user_recipe/' + item.dietId}">
              {{item.dietTitle}}
            </router-link>
          </el-header>
          <el-main>
            <span>
              <div class="rectangle"></div>
              <router-link to="/community_author">&nbsp;{{item.accountName}}</router-link>
            </span><br/>
            <span>{{item.dietIntroduce}}</span><span>……</span>
          </el-main>
          <el-footer>
            <el-button style="background-color: #8cccc1;color: white"><router-link tag="span" :to="{path:'/user_recipe/' + item.dietId}">继续阅读</router-link></el-button>
          </el-footer>
        </el-container>
      </el-container>

      <el-row :gutter="20" style="background-color: white">
        <br/>
        <el-col :span="12" :offset="5">
          <!--分页-->
          <div class="block">
            <el-pagination
              @current-change="currentPageNum" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="len">
            </el-pagination>
          </div>
          <!--current-change当前页变动时候触发的事件-->
        </el-col>
      </el-row>

    </el-row>
    <router-view></router-view>
    <div>
      <!--<el-row :gutter="50">-->
      <!--<el-col :span="8" v-for="(item,index) in userRecipeBriefList" :key="index" v-if="item.dietId>0 && item.dietId<4">-->
      <!--<el-card :body-style="{ padding: '0px' }">-->
      <!--<div class="cover">-->
      <!--<img :src=item.dietPhoto class="image">-->
      <!--&lt;!&ndash;<button>点开</button>&ndash;&gt;-->
      <!--</div>-->
      <!--<div class="info" style="padding: 14px;">-->
      <!--<router-link :to="{path:'/user_recipe/' + item.dietId}">-->
      <!--<p class="title">{{ item.dietTitle }}</p>-->
      <!--</router-link>-->
      <!--<div class="author">-->
      <!--<img class="headPhoto" :src=item.headPhoto>-->
      <!--<p>{{item.accountName}}</p>-->
      <!--</div>-->
      <!--<div class="bottom clearfix">-->
      <!--<time class="time">{{item.recipePraiseNum}}点赞 · 120收藏</time>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-card><br/>-->
      <!--</el-col>-->
      <!--</el-row>-->
  </div>

  </div>
</template>

<script>
    export default {
      name: "UserRecipeBrief",
      data(){
        return{
          userRecipeBriefList:[],
          // 分页
          infoList: [],//每页显示的数据
          // articleList: [],//所有的数据
          currentPage: 1,//当前页
          len: 0,//默认总的数据长度
          pageSize: 5,//默认每页显示的数量
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get(`${$LH.url}/recipes/users/all`)
          .then((res) =>{
            var allData = res.data.data;
            this.userRecipeBriefList=allData;
            this.len = res.data.data.length;
            // 分段落
            for (var i=0;i<this.userRecipeBriefList.length;i++) {
              this.userRecipeBriefList[i].dietIntroduce = this.userRecipeBriefList[i].dietIntroduce.replace(/\/\//g, '<br/>').substr(0,80)
            }
            // 分页
            this.handleInfo();
          })
          .catch(function (err) {
            console.log(err)
          });
      },
      methods: {
        handleInfo() {
          // 页数，如果有小数，只取整数部分
          let pageNum = Number(String(this.len / this.pageSize).split(".")[0]);
          // 定义一个空数组
          let newArr = [];
          // 遍历获取的数据，每次遍历都从数组的0位置开始截取，截取数量为每页显示的数量
          for (let i = 0; i < pageNum; i++) {
            newArr.push(this.userRecipeBriefList.splice(0, this.pageSize));
          }
          // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
          if (this.userRecipeBriefList.length < this.pageSize) {
            newArr.push(this.userRecipeBriefList.splice(0, this.userRecipeBriefList.length));
          }
          // 将新的数组赋给articleList[],用来渲染页面
          this.userRecipeBriefList = newArr;
          // 第一次进入页面显示this.articleList[]数组的第一个元素
          this.infoList = this.userRecipeBriefList[0]
          // console.log(this.infoList[0])
        },
        currentPageNum(currentPage) {
          // currentPage为当前的页数
          // 显示当前页数对应的数据
          this.infoList = this.userRecipeBriefList[currentPage - 1];
        }
      }
    }
</script>

<style scoped>
  /*button{*/
    /*position: absolute;*/
    /*top: 10px;*/
  /*}*/
  /*.cover{*/
    /*background: #000;*/
    /*position: relative;*/
  /*}*/

  /*.image{*/
    /*width: 100%;*/
    /*display: block;*/
    /*!*float: left;*!*/
  /*}*/
  /*.image:hover{*/
    /*opacity:0.6;*/
  /*}*/
  /*.title{*/
    /*font-size: 14px;*/
    /*width: 70%;*/
    /*height: 35px;*/
    /*line-height: 35px;*/
    /*!*text-overflow: ellipsis;*!*/
    /*overflow: hidden;*/
    /*word-space:nowrap;*/
    /*!*border: 1px solid pink;*!*/
  /*}*/
  /*.info{*/
    /*position: relative;*/
    /*text-overflow: ellipsis;*/
  /*}*/
  /*.author{*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*right: 10px;*/
    /*top:-15px;*/
    /*font-size: 9px;*/
    /*text-align: center;*/
    /*text-overflow: ellipsis;*/
    /*color: #6a6a6a;*/
  /*}*/
  /*.headPhoto{*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*border-radius: 20px;*/
    /*border: 1px solid white;*/
  /*}*/
  /*.el-card{*/
    /*!*padding: 15px;*!*/
    /*border-radius: 0px;*/
  /*}*/
  /*.time {*/
    /*font-size: 10px;*/
    /*color: #999;*/
  /*}*/

  /*.bottom {*/
    /*margin-top: 13px;*/
    /*line-height: 12px;*/
  /*}*/

  /*.button {*/
    /*padding: 0;*/
    /*float: right;*/
  /*}*/

  /*.clearfix:before,*/
  /*.clearfix:after {*/
    /*display: table;*/
    /*content: "";*/
  /*}*/

  /*.clearfix:after {*/
    /*clear: both*/
  /*}*/


  .header_height{
    height: 40px;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  img{
    width: 280px;
  }
  .el-header{
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 18px;

  }
  .el-footer{
    background-color: white;
    color: #333;
    text-align: right;
    line-height: 60px;
    border-bottom: 1px solid gainsboro;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    border-bottom: 1px solid gainsboro;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
    padding-top: 0px;
  }

  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid white;
    border-bottom: 6px solid white;
    border-top: 6px solid white;
    border-left: 6px solid #8cccc1;
    display: inline-block;
  }
  .rectangle{
    height: 12px;
    width: 5px;
    background: #8cccc1;
    display: inline-block;
  }

</style>
