<template>
  <div id="footer">
    <el-row class="w">
      <el-col :span="6">
        <!--<img src="../../assets/Hlogo.png" width="100" alt="">-->
        <p>爱上厨房，让你体验不同的厨房生活！</p>
        <p>推荐使用Chrome/火狐/IE9以上的浏览器</p>
      </el-col>
      <el-col :span="4">
        <ul>
          <li><strong>逛食谱</strong></li>
          <li>热门食谱</li>
          <li>最新食谱</li>
          <li>最爱家常菜</li>
        </ul>
      </el-col>
      <el-col :span="4">
        <ul>
          <li><strong>社区活动</strong></li>
          <li>达人推荐</li>
          <li>好文推荐</li>
          <li>近期活动</li>
        </ul>
      </el-col>
      <el-col :span="4">
        <ul>
          <li><strong>联系我们</strong></li>
          <li>021-888888888</li>
          <li>lxms@163.com</li>
        </ul>
      </el-col>
      <el-col :span="4">
        <ul>
          <li><strong>社交平台</strong></li>
          <li><span>微信</span><span>QQ</span><span>微博</span></li>
        </ul>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-caret-top"></i>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    
  }
</script>

<style scoped>
  #footer {
    background-color: #daeae8;
    padding-top:20px;
  }
  #footer .el-row .el-col:first-child p{
    width: 200px;
  }
  #footer .el-col li>strong {
    font-size: 18px;
  }
  #footer .el-col i, #footer .el-col span{
    border:1px solid #ccc;
    border-radius: 50%;
  }
  #footer .el-col i{
    font-size: 40px;
    float:right;
    color: #ffa766;
  }
  #footer .el-col span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
  }
</style>
