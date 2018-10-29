<template>
    <div class="w">
      <p style="color: transparent">111</p>
      <el-row :gutter="20">
        <el-col :span="16" >
          <el-header class="title">享食社区&nbsp;&nbsp;>>&nbsp;文章详情</el-header>
          <el-main>
              <el-col span="24" tag="h2" class="title">
                <div class="triangle"></div>{{articleName}}
                <!--<button>点赞</button>-->
                <hr/>
              </el-col>
              <span>
                <div class="rectangle"></div>
                <router-link to="/community_author">&nbsp;{{authorName}}</router-link>
              </span><br/><br/>
              <img :src=articlePic><br/>
              <p v-html="articleContent">{{articleContent}}</p>
          </el-main>
        </el-col>
        <el-col :span="8">
          <recommend></recommend>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import ArticleSearch from './ArticleSearch.vue'
  import Recommend from "./Recommend";


  export default {
      name: "ArticleDetail",
      components:{
          'article-search':ArticleSearch,
          'recommend':Recommend
        },
      data(){
        return{
          articleId:'',
          articleName:'',
          articleTime:'',
          articleContent:'',
          articlePraiseNum:'',
          articlePic:'',
          authorName:'',
          //路由传参获取的id
          p_articleId:this.$route.params.articleId,
          //点赞按钮的状态,初始状态为false，未点击
          // isClick:'false',
          // className:'danger',
          // btnValue:'点赞'
        }
      },
      // methods:{
      //   praise(){
      //     // 判断是否登录
      //     // if ()
      //     if (this.isClick == 'false') {
      //       // this.typeName = 'info';
      //       this.btnValue = '已赞';
      //       this.isClick = 'true';
      //       // this.$axios.post('http://localhost:3000/praiseNum/addArtPraNum',{
      //       //   p_articleId:this.p_articleId
      //       // })
      //       //   .then(function (response) {
      //       //     console.log(response)
      //       //   })
      //       //   .catch(function (err) {
      //       //     console.log(err)
      //       //   });
      //     }
      //     else if (this.isClick == 'true') {
      //       // this.typeName = 'danger';
      //       this.btnValue = '点赞';
      //       this.isClick = 'false';
      //     }
      //   }
      // },
      created(){
        //根据id获取的文章
        this.$axios.get(`${$LH.url}/community/article/details/` + this.p_articleId)
          .then((res) =>{
            var articleDetail = res.data.data;
            this.articleId = articleDetail[0].articleId;
            this.articleName = articleDetail[0].articleName;
            this.articleTime = articleDetail[0].articleTime;
            this.articleContent = articleDetail[0].articleContent;
            this.articlePraiseNum = articleDetail[0].articlePraiseNum;
            this.articlePic = articleDetail[0].articlePic;
            // 分段落
            this.articleContent = this.articleContent.replace(/\/\//g, '<br/><br/>')
          })
          .catch(function (err) {
            console.log(err)
        });
        this.$axios.get(`${$LH.url}/community/article/all`)
          .then((res) => {
            var articleList = res.data.data;
            this.authorName = articleList[0].authorName;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
</script>

<style scoped>
  .title{
    position: relative;
  }
  button{
    width: 80px;
    height: 35px;
    border-radius: 4px;
    background-color: #8cccc1;
    /*background-color: #999999;*/
    color: white;
    text-align: center;
    font-size: 14px;
    border: none;
    position: absolute;
    right: 10px;
  }
  div{
    /*background-color: #fdf6dc;*/
  }
  img{
    width: 500px;
    display: block;
  }

  .el-header{
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 18px;
    color: white;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
    border: 1px solid gainsboro;
  }

  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid white;
    border-bottom: 6px solid white;
    border-top: 6px solid white;
    border-left: 6px solid #8cccc1;
    /*border: 6px solid red;*/
    display: inline-block;
  }

  .rectangle{
    height: 12px;
    width: 5px;
    background: #8cccc1;
    display: inline-block;
  }
</style>
