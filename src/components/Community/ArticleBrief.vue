<template>
  <div id="container">
    <el-row :gutter="10">
      <el-container v-for="(item,index) in articleInfoList" :key="index">
        <el-aside width="310px">
            <br/>
            <img :src=item.articleCoverImg>
          </el-aside>
          <el-container>
            <el-header>
              <div class="triangle"></div>
              <!--跳转路由是/article_detail/articleId，其中articleId是item.articleId，怎么实现拼接？-->
              <router-link :to="{path:'/article_detail/' + item.articleId}">
                {{item.articleName}}
              </router-link>
            </el-header>
            <el-main>
              <span>
                <div class="rectangle"></div>
                <router-link to="/community_author">&nbsp;
                  {{item.authorName}} 发表于 2018/10/13
                </router-link>
              </span><br/>
              <span v-html="item.articleContent">
                {{item.articleContent}}
              </span><span>……</span>
            </el-main>
            <el-footer>
              <el-button style="background-color: #8cccc1;color: white"><router-link tag="span" :to="{path:'/article_detail/' + item.articleId}">继续阅读</router-link></el-button>
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
  </div>
</template>

<script>
  export default {
    name: "articleBrief",
    data() {
      return {
        // 分页
        articleInfoList: [],//每页显示的数据
        articleList: [],//所有的数据
        currentPage: 1,//当前页
        len: 0,//默认总的数据长度
        pageSize: 5,//默认每页显示的数量
      }
    },
    created(){
      this.$axios.get(`${$LH.url}/community/article/all`)
        .then((res) => {
          this.articleList = res.data.data;
          this.len = res.data.data.length;
          console.log(this.articleList.length);
          // 分段落
          for (var i=0;i<this.articleList.length;i++) {
            this.articleList[i].articleContent = this.articleList[i].articleContent.replace(/\/\//g, '<br/>').substr(0,80)
          }
          // 分页
          this.handleInfo();
        })
        .catch((err) => {
          console.log(err)
        })
    },

    methods: {
      handleInfo() {
        // 页数，如果有小数，只取整数部分
        let pageNum = Number(String(this.len / this.pageSize).split(".")[0]);
        // 定义一个空数组
        let newArr = [];
        // 遍历获取的数据，每次遍历都从数组的0位置开始截取，截取数量为每页显示的数量
        for (let i = 0; i < pageNum; i++) {
          newArr.push(this.articleList.splice(0, this.pageSize));
        }
        // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
        if (this.articleList.length < this.pageSize) {
          newArr.push(this.articleList.splice(0, this.articleList.length));
        }
        // 将新的数组赋给articleList[],用来渲染页面
        this.articleList = newArr;
        // 第一次进入页面显示this.articleList[]数组的第一个元素
        this.articleInfoList = this.articleList[0]
        // console.log(this.articleList[0])
      },
      currentPageNum(currentPage) {
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.articleInfoList = this.articleList[currentPage - 1];
      }
    }
  }
</script>

<style scoped>
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
