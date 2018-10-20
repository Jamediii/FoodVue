<template>
    <div id="container">
      <br/>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-container>
            <el-header>
              <span style="font-weight: bold;font-size: 25px">
                <!--土豆沙拉丨健康·三餐-->
                {{recipeName}}
              </span>
            </el-header>

            <el-main>
              <!--<img src="http://i1.chuimg.com/a38a44ee4d4511e7947d0242ac110002_1280w_853h.jpg@2o_50sh_1pr_1l_660w_90q_1wh ">-->
              <img :src=recipeCoverImg>
            </el-main>

            <el-footer>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="10">
                  <span>
                    <!--无蛋黄酱仍旧超级creamy的土豆沙拉-->
                    <!--{{recipeBrief}}-->
                  </span>
                </el-col>
                <el-col :span="2">
                  <el-button type="danger">收藏</el-button>
                </el-col>
              </el-row>
            </el-footer>
          </el-container>

          <recipe-food-table></recipe-food-table>
          <recipe-step></recipe-step>
        </el-col>
      </el-row>
      <br/>
    </div>
</template>

<script>
  import RecipeFoodTable from './RecipeFoodTable'
  import RecipeStep from './RecipeStep'
    export default {
        name: "RecipeDetail",
      components:{
        'recipe-food-table':RecipeFoodTable,
        'recipe-step':RecipeStep
      },
      data(){
        return{
          //菜谱详情表内数据
          detailsId:'',
          recipeName:'',
          recipeBrief:'',
          recipeAuthor:'',
          recipePraiseNum:'',
          recipeCoverImg:'',
          //食材表
          f_detailsId:'',
          foodId:'',
          foodNum:'',
          //调料表
          a_detailsId:'',
          accessoriesId:'',
          accessoriesName:'',
          accessoriesNum:'',
          //步骤表内数据
          s_detailsId:'',
          recipeStepId:[],
          id:[],
          recipeStepBrief:[],
          recipeStepImg:[],
          //路由传参获取的id
          p_recipeId:this.$route.params.detailsId
        }
      },
      created(){
        //根据id获取的菜谱
        this.$axios.get('http://localhost:3000/recipes/details/' + this.p_recipeId)
          .then((res) =>{
            var allData = res.data.data;
            var recipeDetail = allData[0];
            this.detailsId = recipeDetail[0].detailsId;
            this.recipeName = recipeDetail[0].recipeName;
            this.recipeBrief = recipeDetail[0].recipeBrief;
            this.recipeAuthor = recipeDetail[0].recipeAuthor;
            this.recipePraiseNum = recipeDetail[0].recipePraiseNum;
            this.recipeCoverImg = recipeDetail[0].recipeCoverImg;
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    }
</script>

<style scoped>
  img{
    height: 500px;
  }
  #container{
    background-color: #fdf6dc;
  }
  span{
    font-size: 16px;
  }

  .el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
  }


  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    background-color: #f9fafc;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

</style>
