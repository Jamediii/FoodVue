<template>
    <div id="container">
      <br/>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <!--卡片部分，大图-->
          <el-container>
            <el-header>
              <!--<br/>-->
              <span style="font-weight: bold;font-size: 25px">土豆沙拉丨健康·三餐 </span>
            </el-header>

            <el-main>
              <img src="http://i1.chuimg.com/a38a44ee4d4511e7947d0242ac110002_1280w_853h.jpg@2o_50sh_1pr_1l_660w_90q_1wh ">
            </el-main>

            <el-footer>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="8">
                  <span>无蛋黄酱仍旧超级creamy的土豆沙拉</span>
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
    font-size: 18px;
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
