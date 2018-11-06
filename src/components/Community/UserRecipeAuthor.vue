<template>
  <div id="container">
    <el-row :gutter="80">
      <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-for="(item,index) in userRecipeBriefList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <el-row class="info" style="padding: 14px;">
            <div class="author">
              <el-col :span="6">
                <img class="headPhoto" :src=item.headPhoto>
              </el-col>
              <el-col :span="10">
                <router-link :to="{path:'/fhuser/' + item.dietId + '/recipe/'}">
                  <span style="font-size: 16px">{{item.accountName}}</span><br>
                </router-link>
                  <span style="font-size: 12px;color: #999">已发表{{item.recipeSum}}个菜谱</span>
              </el-col>
              <el-col :span="8">
                <router-link :to="{path:'/fhuser/' + item.dietId + '/recipe/'}">
                  <button>进入作者主页</button>
                </router-link>
              </el-col>
            </div>
          </el-row>
        </el-card><br/>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "UserRecipeAuthor",
    data(){
      return{
        userRecipeBriefList:[],
        // 用户Id
        userId: localStorage.getItem('userId'),
        //达人 Id
        fansId: '',
      }
    },
    created(){
      //获取的全部菜谱
      this.$axios.get(`${$LH.url}/recipes/users/info`)
        .then((res) =>{
          var allData = res.data.data;
          this.userRecipeBriefList=allData;
          // this.fansId = this.userRecipeBriefList[0].userId;
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
  .headPhoto{
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }
  button {
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #8cccc1;
    color: white;
    text-align: center;
    border: none;
    text-decoration: none;
    bottom: 100px;
    font-size: 16px;
  }

</style>
