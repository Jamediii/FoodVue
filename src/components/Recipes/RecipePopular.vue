<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="6" v-for="(item,index) in recipeBriefList" :key="index" v-if="index>11 && index<16">
        <el-container>
          <el-main>
            <img :src=item.recipeCoverImg>
          </el-main>
          <el-footer>
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span>{{item.recipeName}}</span><br/>
            </router-link>
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span style="font-size: 10px;color: gray">by{{item.accountName}}</span>
            </router-link>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "RecipePopular",
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
            console.log(this.recipeBriefList)
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
  img{
    width: 100%;
    /*height: 305px;*/
  }
  .el-footer {
    background-color: #fae8c8;
    color: #333;
    text-align: center;
    /*line-height: 60px;*/
    padding: 15px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    padding: 0px;
  }

</style>
