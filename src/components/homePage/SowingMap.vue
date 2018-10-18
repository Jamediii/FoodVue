<template>

  <div id="Sowingmap" class="w">
    <el-row :gutter="20">
      <!--轮播图部分-->
      <el-col :xs="12" :sm="14" :md="16" :lg="18" :xl="18">

          <div class="block">

            <el-carousel >

              <el-carousel-item v-for="item in 2" :key="item">
                <router-link to="/recipe_detail"> <img src="../../assets/meal1.jpg" alt=""></router-link>
              </el-carousel-item>

            </el-carousel>

          </div>

        <p>開始感受到炎炎夏日的威力,最適合來道麻辣開胃的川味料理,溫順椒香拌著麵條及軟嫩的雞腿肉,爽脆的黃瓜,交織出豐富層次~另人純垂涎三尺的美味</p>
        <ul>
          <li><span class="glyphicon glyphicon glyphicon-user"></span>作者名称</li>
          <li><span class="glyphicon glyphicon glyphicon-heart"></span>点赞数</li>
          <li><span class="glyphicon glyphicon glyphicon-comment"></span>评论数</li>
        </ul>
      </el-col>
      <!--右边文章推荐部分-->
      <el-col class="ArticleRemRight" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <router-link to="/article_detail">
          <el-card shadow="hover" v-for="item1 in 7" :key="item1">
            鼠标悬浮时显示
          </el-card>
        </router-link>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: "SowingMap"
  }
</script>

<style scoped>
  /*轮播图部分开始*/
  #Sowingmap {
    margin-top: 40px;
  }

  #Sowingmap .block {

    width: 800px;
  }

  #Sowingmap .block .el-carousel__item {
    background-size: cover;
    /*background-image: url("../../assets/meal1.jpg");*/
  }

  #Sowingmap .el-col p {
    width: 800px;
  }

  #Sowingmap .el-col ul {
    list-style: none;
  }

  #Sowingmap .el-col li {
    float: left;
  }

  #Sowingmap .el-col li span {
    display: inline-block;
    margin: 0 10px;
  }

  #Sowingmap .el-col li span:last-child {
    color: #ee2233;
  }

  /*轮播图部分结束*/

  /*右边文章推荐部分开始*/
  #Sowingmap .ArticleRemRight .el-card {
    margin-bottom: 10px;
  }

  /*右边文章推荐部分结束*/
</style>
