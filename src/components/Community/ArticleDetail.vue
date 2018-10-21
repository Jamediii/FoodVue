<template>
    <div>
      <br/>
      <el-row :gutter="30">
        <el-col :span="11" :offset="4">
          <el-container>
            <el-header>
              <div class="triangle"></div>
              {{articleName}}
              <el-button v-bind:type="typeName" @click="praise">{{btnValue}}</el-button>
              <hr/>
            </el-header>
            <el-main>
              <span>
                <div class="rectangle"></div>
                <router-link to="/community_author">&nbsp;
                  爱料理 编辑部
                  <!--{{articleAuthor}}-->
                  发表于
                  2018/10/13
                  <!--{{articleTime}}-->
                </router-link>
              </span><br/>
              <img :src=articlePic><br/>
              {{articleContent}}
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="5">
          <article-search></article-search><br/>
          <author-list></author-list>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import ArticleSearch from './ArticleSearch.vue'
  import AuthorList from './AuthorList.vue'

  export default {
      name: "ArticleDetail",
      components:{
          'article-search':ArticleSearch,
          'author-list':AuthorList,
        },
      data(){
        return{
          articleId:'',
          articleName:'',
          articleTime:'',
          articleContent:'',
          articlePraiseNum:'',
          articlePic:'',
          //路由传参获取的id
          p_articleId:this.$route.params.articleId,
          //点赞按钮的状态,初始状态为false，未点击
          isClick:false,
          typeName:'danger',
          btnValue:'赞'
        }
      },
      methods:{
        praise(){
          if (this.isClick == 'false') {
            this.typeName = 'info';
            this.btnValue = '已赞';
            this.isClick = 'true';
            // this.$axios.post('http://localhost:3000/praiseNum/addArtPraNum',{
            //   p_articleId:this.p_articleId
            // })
            //   .then(function (response) {
            //     console.log(response)
            //   })
            //   .catch(function (err) {
            //     console.log(err)
            //   });
          }
          else {
            this.typeName = 'danger';
            this.btnValue = '赞';
            this.isClick = 'false';
          }
        }
      },
      created(){
        //根据id获取的文章
        this.$axios.get('http://localhost:3000/community/article/details/' + this.p_articleId)
          .then((res) =>{
            var articleDetail = res.data.data;
            // console.log(articleDetail[0]);
            this.articleId = articleDetail[0].articleId;
            this.articleName = articleDetail[0].articleName;
            this.articleTime = articleDetail[0].articleTime;
            this.articleContent = articleDetail[0].articleContent;
            this.articlePraiseNum = articleDetail[0].articlePraiseNum;
            this.articlePic = articleDetail[0].articlePic;
          })
          .catch(function (err) {
            console.log(err)
        });
      }
    }
</script>

<style scoped>
  div{
    background-color: #fdf6dc;
  }
  img{
    width: 500px;
  }
  .el-header {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 20px;
    border-bottom:1px solid gainsboro;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
  }

  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid white;
    border-bottom: 6px solid white;
    border-top: 6px solid white;
    border-left: 6px solid red;
    /*border: 6px solid red;*/
    display: inline-block;
  }

  .rectangle{
    height: 12px;
    width: 5px;
    background: red;
    display: inline-block;
  }
</style>
