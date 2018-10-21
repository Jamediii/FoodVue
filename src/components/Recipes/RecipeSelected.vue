<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in recipeBriefList" :key="index" v-if="index>42 && index<49">
        <el-container>
          <el-main>
            <img :src=item.recipeCoverImg>
          </el-main>
          <el-footer>
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span>{{item.recipeName}}</span>
            </router-link>
          </el-footer>
        </el-container><br/>
      </el-col>

      <el-col :span="4" v-for="(item,index) in recipeBriefList" :key="index" v-if="index>31 && index<38">
        <el-container>
          <el-main>
            <img :src=item.recipeCoverImg>
          </el-main>
          <el-footer>
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
              <span>{{item.recipeName}}</span>
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
    name: "RecipeSelected",
    data(){
      return{
        recipeBriefList:[],
      }
    },
    created(){
      //根据id获取的菜谱
      this.$axios.get('http://localhost:3000/recipes/all')
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
    /*height: 200px;*/
  }
  .el-footer {
    background-color: #fae8c8;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    padding: 0px;
  }

</style>

