<template>
  <div>
    <el-table :data="recipeFoodList" style="width: 100%">
      <el-table-column prop="foodName" label="食材表 " width="180"></el-table-column>
      <el-table-column prop="foodNum" label=" " width=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "RecipeFood",
      data() {
        return {
          recipeFoodList:[],
          // accessoriesList:[],
          //路由传参获取的id
          p_recipeId:this.$route.params.detailsId
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get(`${$LH.url}/recipes/details/` + this.p_recipeId)
          .then((res) =>{
            var allData = res.data.data;
            this.recipeFoodList = allData[1];
            // this.accessoriesList = allData[2];
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
  div{
    padding: 20px;
    background: white;
    font-size: 16px;
  }

</style>
