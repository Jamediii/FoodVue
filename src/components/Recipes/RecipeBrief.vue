<template>
  <div>
    <ul>
    <el-row >
      <el-col :span="6" v-for="(item,index) in recipeBriefList" :key="index" v-if="index>268" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg class="image">
          </router-link>
          <div style="padding: 14px;">
            <span>{{ item.recipeName }}</span>
            <div class="bottom clearfix">
              <time class="time"></time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
        <br/>
      </el-col>
    </el-row></ul>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "RecipeBrief",
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
            // console.log(this.recipeBriefList)
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
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

  .image {
    width: 100%;
    height: 200px;
    display: block;
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
