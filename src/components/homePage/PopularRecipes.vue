<template>
  <!--最受欢迎食谱部分-->
  <div id="popRecipes">
    <el-row class="bg1">
      <p></p>
      <h2>最受欢迎食谱</h2>
      <el-col>
        <el-row class="popRecList">
          <el-col :span="3"></el-col>
          <el-col :span="4" v-for="(o, index) in 4" :key="o">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/popRecipeIcon.png" class="image">
              <div style="padding: 14px;">
                <span>菜谱名</span>
                <div class="bottom clearfix">
                  <p>菜谱作者名称</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PopularRecipes",
    methods: {}
  }
</script>

<style scoped>
  #popRecipes {
    margin-top: 20px;
    position: relative;
  }

  #popRecipes .bg1 {
    height: 540px;
    background: url("../../assets/bg_pic.png") center no-repeat;
  }

  #popRecipes .bg1 > p {
    width: 100px;
    height: 100px;
    background: url("../../assets/popRecipeIcon.png") center no-repeat;
    margin: 10px auto;
  }

  #popRecipes .bg1 h2 {
    text-align: center;
    font-size: 40px;
    margin-top: 20px;
  }

  #popRecipes .popRecList:first-child {
    background-color: transparent;
  }

  #popRecipes .popRecList .el-col {
    margin: 30px 10px;
  }

</style>
