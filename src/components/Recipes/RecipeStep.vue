<template>
    <div>
      <!--第一步-->
      <el-container>
        <el-header><span style="font-size: 20px;font-weight: bold">详细步骤</span></el-header>
        <el-container v-for="(item,index) in recipeStepList" :key="index">
          <el-aside width="300px">
            <img :src=item.recipeStepImg>
          </el-aside>
          <el-main>
            <h2>{{item.id}}</h2>
            <span>{{item.recipeStepBrief}}</span>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
      name: "RecipeStep",
      data(){
        return{
          recipeStepList:[],
          //路由传参获取的id
          p_recipeId:this.$route.params.detailsId
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get(`${$LH.url}/recipes/details/` + this.p_recipeId)
          .then((res) =>{
            var allData = res.data.data;
            this.recipeStepList = allData[3];
            console.log(this.recipeStepList);
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
  img{
    width: 250px;
  }
  .el-header {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-aside {
    background-color: white;
    color: #333;
    text-align: left;
    padding: 15px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border-bottom: 1px solid gainsboro;
  }

</style>
