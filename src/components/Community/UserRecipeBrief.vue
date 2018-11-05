<template>
  <div id="container">
    <el-row :gutter="50">
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in userRecipeBriefList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div class="imgchange">
            <router-link :to="{path:'/user_recipe/' + item.dietId}">
              <img :src=item.dietPhoto class="image">
            </router-link>
          </div>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/user_recipe/' + item.dietId}">
              <p class="title">{{ item.dietTitle }}</p>
            </router-link>
            <div class="author">
              <!--<img class="headPhoto" :src=item.headPhoto>-->
              <p>{{item.accountName}}</p>
            </div>
          </div>
        </el-card><br/>
      </el-col>
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
        this.$axios.get(`${$LH.url}/recipes/users/all`)
          .then((res) =>{
            var allData = res.data.data;
            this.userRecipeBriefList=allData;
            this.len = res.data.data.length;
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
  .imgchange{
    overflow: hidden;
  }
  .image:hover{
    /*opacity: 0.8;*/
    transform: scale(1.4);
  }
  .like{
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -40px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    border-radius: 4px;
    color: red;
    background-color: rgba(192, 196, 204, 0.5);
    border: none;
    cursor:pointer;
  }
  .title{
    font-size: 16px;
    width: 80%;
    height: 35px;
    line-height: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-space:nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    /*word-break: break-all;  !* 内容自动换行 *!*/
  }
  .info{
    position: relative;
    text-overflow: ellipsis;
  }
  .author{
    display: inline-block;
    position: absolute;
    right: 10px;
    top:-15px;
    font-size: 12px;
    text-align: center;
    text-overflow: ellipsis;
    color: #6a6a6a;
  }
  .headPhoto{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid white;
  }
  .el-card{
    /*padding: 15px;*/
    border-radius: 0px;
  }
  .image{
    width: 100%;
    /*height: 300px;*/
    transition: all 0.6s;
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  /*div{*/
    /*font-size: 16px;*/
  /*}*/
  /*.header_height{*/
    /*height: 40px;*/
  /*}*/
  /*a {*/
    /*text-decoration: none;*/
  /*}*/
  /*.router-link-active {*/
    /*text-decoration: none;*/
  /*}*/
  /*img{*/
    /*width: 90%;*/
  /*}*/
  /*.el-header{*/
    /*background-color: white;*/
    /*color: #333;*/
    /*text-align: left;*/
    /*line-height: 60px;*/
    /*font-size: 22px;*/

  /*}*/
  /*.el-footer{*/
    /*background-color: white;*/
    /*color: #333;*/
    /*text-align: right;*/
    /*line-height: 60px;*/
    /*border-bottom: 1px solid gainsboro;*/
  /*}*/

  /*.el-aside {*/
    /*background-color: white;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*border-bottom: 1px solid gainsboro;*/
  /*}*/

  /*.el-main {*/
    /*background-color: white;*/
    /*color: #333;*/
    /*text-align: left;*/
    /*line-height: 30px;*/
    /*padding-top: 0px;*/
  /*}*/

  /*.triangle {*/
    /*height: 0;*/
    /*width: 0;*/
    /*border-right: 6px solid white;*/
    /*border-bottom: 6px solid white;*/
    /*border-top: 6px solid white;*/
    /*border-left: 6px solid #8cccc1;*/
    /*display: inline-block;*/
  /*}*/
  /*.rectangle{*/
    /*height: 12px;*/
    /*width: 5px;*/
    /*background: #8cccc1;*/
    /*display: inline-block;*/
  /*}*/

</style>
