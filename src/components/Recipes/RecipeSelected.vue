<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>33 && item.detailsId<37">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span style="font-size: 16px">{{ item.recipeName }}</span>
            </router-link>
            <div class="bottom clearfix">
              <!--<time class="time">{{item.recipeBrief}}</time>-->
            </div>
          </div>
        </el-card><br/>
      </el-col>

      <el-col :span="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>54 && item.detailsId<58">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span style="font-size: 16px">{{ item.recipeName }}</span>
            </router-link>
            <div class="bottom clearfix">
              <!--<time class="time">{{item.recipeBrief}}</time>-->
            </div>
          </div>
        </el-card><br/>
      </el-col>

      <el-col :span="8" v-for="(item,index) in recipeBriefList" :key="index" v-if="item.detailsId>57 && item.detailsId<61">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div class="info" style="padding: 14px;">
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span style="font-size: 16px">{{ item.recipeName }}</span>
            </router-link>
            <div class="author">
              <img class="headPhoto" :src=item.headPhoto>
            </div>
            <div class="bottom clearfix">
              <!--<time class="time">{{item.recipeBrief}}</time>-->
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
      }
    },
    created(){
      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/all`)
        .then((res) =>{
          var allData = res.data.data;
          this.recipeBriefList=allData;
          // console.log(this.recipeBriefList[0].headPhoto)
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
  .info{
    position: relative;
  }
  .author{
    display: inline-block;
    position: absolute;
    padding-left: 20px;
  }
  .headPhoto{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .el-card{
    padding: 15px;
  }
  .image{
    width: 100%;
    /*height: 300px;*/
  }

  .time {
    font-size: 13px;
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

