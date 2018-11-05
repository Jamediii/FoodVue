<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="20">
        <el-header >享受美食&nbsp;&nbsp;&nbsp;享受生活 — — 精选</el-header>
      </el-col>
      <el-col :span="4">
        <router-link to="/recipecl/8">
          <p style="text-align: right;height:60px;line-height: 60px">查看全部精选菜谱>></p>
        </router-link>
      </el-col>
      <br/>
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in recipeBriefList" :key="index"
              v-if="item.detailsId>41 && item.detailsId<48">
              <!--v-if="(item.recipeClassifyId == recipeClassifyIds.recipeClassifyId) && index0<6">-->

        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <p class="title">{{ item.recipeName }}</p>
            </router-link>
            <div class="author">
              <img class="headPhoto" :src=item.headPhoto>
              <p>{{item.accountName}}</p>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{item.recipePraiseNum}}点赞 · {{item.commentSum}}留言</time>
            </div>
          </div>
        </el-card><br/>
      </el-col>

      <el-col :span="20">
        <el-header >享受美食&nbsp;&nbsp;&nbsp;享受生活 — — 家常菜</el-header>
      </el-col>
      <el-col :span="4">
        <router-link to="/recipecl/1">
          <p style="text-align: right;height:60px;line-height: 60px">查看全部家常菜菜谱>></p>
        </router-link>
      </el-col>
      <br/>
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>61 && item.detailsId<68">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <p class="title">{{ item.recipeName }}</p>
            </router-link>
            <div class="author">
              <img class="headPhoto" :src=item.headPhoto>
              <p>{{item.accountName}}</p>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{item.recipePraiseNum}}点赞 · {{item.commentSum}}留言</time>
            </div>
          </div>
        </el-card><br/>
      </el-col>

      <el-col :span="20">
        <el-header >享受美食&nbsp;&nbsp;&nbsp;享受生活 — — 煲汤</el-header>
      </el-col>
      <el-col :span="4">
        <router-link to="/recipecl/8">
          <p style="text-align: right;height:60px;line-height: 60px">查看全部煲汤菜谱>></p>
        </router-link>
      </el-col>
      <br/>
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>92 && item.detailsId<99">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <p class="title">{{ item.recipeName }}</p>
            </router-link>
            <div class="author">
              <img class="headPhoto" :src=item.headPhoto>
              <p>{{item.accountName}}</p>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{item.recipePraiseNum}}点赞 · {{item.commentSum}}留言</time>
            </div>
          </div>
        </el-card><br/>
      </el-col>

      <el-col :span="20">
        <el-header >享受美食&nbsp;&nbsp;&nbsp;享受生活 — — 主食</el-header>
      </el-col>
      <el-col :span="4">
        <router-link to="/recipecl/7">
          <p style="text-align: right;height:60px;line-height: 60px">查看全部主食菜谱>></p>
        </router-link>
      </el-col>
      <br/>
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>5 && item.detailsId<12">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <p class="title">{{ item.recipeName }}</p>
            </router-link>
            <div class="author">
              <img class="headPhoto" :src=item.headPhoto>
              <p>{{item.accountName}}</p>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{item.recipePraiseNum}}点赞 · {{item.commentSum}}留言</time>
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
    name: "RecipeSelected",
    data(){
      return{
        recipeBriefList:[],
        recipeClassName: "",//菜谱分类对应的名称
        commentNum:0,
        recipeClassifyIdList:[
          {recipeClassifyId:8},
          {recipeClassifyId:1},
          {recipeClassifyId:2},
          {recipeClassifyId:3},
          {recipeClassifyId:7},
        ]
      }
    },
    created(){
      //获取全部的菜谱
      this.$axios.get(`${$LH.url}/recipes/all`)
        .then((res) =>{
          var allData = res.data.data;
          this.recipeBriefList=allData;
          console.log(allData)
          // console.log(this.recipeBriefList[0].headPhoto)
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
  .title{
    font-size: 16px;
    width: 70%;
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
    padding: 15px;
  }
  .image{
    width: 100%;
    /*height: 300px;*/
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

  .el-header{
    /*background-color: #8cccc1;*/
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 26px;
    font-weight: bold;
    /*color: white;*/
  }

</style>

