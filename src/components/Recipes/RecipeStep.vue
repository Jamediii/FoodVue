<template>
    <div>
      <!--第一步-->
      <el-container>
        <el-header><span style="font-size: 20px;font-weight: bold">详细步骤</span></el-header>
        <el-container>
          <el-aside width="300px">
            <img src="http://i2.chuimg.com/7f5da64c954911e6a9a10242ac110002_1588w_1676h.jpg?imageView2/2/w/300/interlace/1/q/90">
          </el-aside>
          <el-main>
            <h2>1</h2>
            <span>油酥分成两份，一份揉进抹茶粉，另一份揉进蔓越莓粉，揉匀各分12份揉圆备用</span>
          </el-main>
        </el-container>
      </el-container>
      <!--第二步-->
      <el-container>
        <el-aside width="300px">
          <img src="http://i1.chuimg.com/73e8ebdc954911e6a9a10242ac110002_2448w_2448h.jpg@2o_50sh_1pr_1l_300w_90q_1wh">
        </el-aside>
        <el-main>
          <h2>2</h2>
          <span>抹茶卷取一个也同上切好，两种颜色交错编制一起，编好再擀平整，一定要编紧密一些</span>
        </el-main>
      </el-container>
      <!--第三步-->
      <el-container>
        <el-aside width="300px">
          <img src="http://i2.chuimg.com/706e005a954911e6b87c0242ac110003_2448w_2448h.jpg?imageView2/2/w/300/interlace/1/q/90">
        </el-aside>
        <el-main>
          <h2>3</h2>
          <span>摆入烤盘放预热好的烤箱中层上下火180度25分钟即可</span>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "RecipeStep"
    }
</script>

<style scoped>
  img{
    height: 300px;
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
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border-bottom: 1px solid gainsboro;
  }

</style>
