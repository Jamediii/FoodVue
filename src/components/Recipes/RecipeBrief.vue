<template>
  <div>
    <el-container v-for="(item,index) in recipeBriefList" :key="index">
      <el-main>
        <img :src=item.recipeCoverImg>
      </el-main>
      <el-footer>
        <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
          <span>{{item.recipeName}}</span>
        </router-link>
      </el-footer>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "RecipeBrief",
      data(){
        return{
          recipeBriefList:[],
          //菜谱详情表内数据
          // detailsId:'',
          // recipeName:'',
          // recipeBrief:'',
          // recipeAuthor:'',
          // recipePraiseNum:'',
          // recipeCoverImg:'',
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get('http://localhost:3000/recipes/all')
          .then((res) =>{
            var allData = res.data.data;
            this.recipeBriefList.push(allData.splice(0,12));
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
    width: 90%;
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
    padding: 20px;
  }
</style>
