<template>
  <div>
    <el-container>
      <el-main>
        <img src="http://i1.chuimg.com/ba05c6ce8ae711e6a9a10242ac110002_1280w_1280h.jpg@2o_50sh_1pr_1l_660w_90q_1wh">
      </el-main>
      <el-footer>
        <router-link to="/recipe_detail"><span>绣球酥</span></router-link>
      </el-footer>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "RecipeBrief"
    }
</script>

<style scoped>

  img{
    width: 90%;
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
    padding: 20px;
  }
</style>
