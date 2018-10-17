<template>
  <div id="container">
    <el-row :gutter="10">
        <hr/>
        <el-container>
          <el-aside width="220px">
            <br/>
            <img src="https://storage.googleapis.com/uploads-blog-icook/2018/10/a673c2ab-66週菜單.001-640x600.jpeg">
          </el-aside>
          <el-container>
            <el-header>
              <div class="triangle"></div>
              <router-link to="/article_detail">【第66週】一週菜单：彩椒松阪猪、呛炒油麦菜、蒜香奶油烤鮭鱼</router-link>
            </el-header>
            <el-main>
              <span>
                <div class="rectangle"></div>
                <router-link to="/community_author">&nbsp;爱料理 编辑部 发表于 2018/10/13</router-link>
              </span><br/>
              <span>鱼类的营养价值高，其中有丰富的蛋白质、omega-3脂肪酸，助於预防心血管疾病等作用，可说是好处多多！
                本週就带大家一同品嚐各式鱼料理，以简易的烹飪技法，让鱼的处理一点也不费力，轻鬆照顾全家人的健康！</span>
            </el-main>
            <el-footer>
              <el-button type="danger"><router-link to="/article_detail">继续阅读</router-link></el-button>
            </el-footer>
          </el-container>
        </el-container>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
        name: "articleBrief"
    }
</script>

<style scoped>
  .router-link {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  img{
    width: 200px;
  }
  .el-header{
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-footer{
    background-color: white;
    color: #333;
    text-align: right;
    line-height: 60px;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
  }

  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid white;
    border-bottom: 6px solid white;
    border-top: 6px solid white;
    border-left: 6px solid red;
    display: inline-block;
  }
  .rectangle{
    height: 12px;
    width: 5px;
    background: red;
    display: inline-block;
  }

</style>
