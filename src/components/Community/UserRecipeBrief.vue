<template>
  <div id="container">
    <el-row :gutter="10">
      <el-container v-for="(item,index) in userRecipeBriefList" :key="index">
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
                <router-link to="/community_author">&nbsp;
                  {{item.accountName}} 发表于 2018/10/13
                </router-link>
              </span><br/>
            <span>{{item.dietIntroduce}}</span>
          </el-main>
          <el-footer>
            <el-button type="danger"><router-link tag="span" :to="{path:'/user_recipe/' + item.dietId}">继续阅读</router-link></el-button>
          </el-footer>
        </el-container>
      </el-container>

    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "UserRecipeBrief",
      data(){
        return{
          userRecipeBriefList:[],
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get('http://localhost:3000/recipes/users/all')
          .then((res) =>{
            var allData = res.data.data;
            this.userRecipeBriefList=allData;
            console.log(this.userRecipeBriefList[0].dietId)
          })
          .catch(function (err) {
            console.log(err)
          });
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
    border-left: 6px solid red;
    display: inline-block;
  }
  .rectangle{
    height: 12px;
    width: 5px;
    background: red;
    display: inline-block;
  }

</style>
