<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>41 && item.detailsId<54">
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
        commentNum:0
      }
    },
    created(){
      //根据id获取的菜谱
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

</style>

