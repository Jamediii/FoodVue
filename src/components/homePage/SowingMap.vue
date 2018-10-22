<template>

  <div id="Sowingmap" class="w">
    <el-row :gutter="20">
      <!--轮播图部分-->
      <el-col :xs="12" :sm="14" :md="16" :lg="17" :xl="17">
        <div class="block">
          <el-carousel>
            <el-carousel-item v-for="(item,index) in imgs" :key="index">
              <img :src="item.pic" alt="">
              <!--<router-link to="/recipe_detail"></router-link>-->
            </el-carousel-item>
          </el-carousel>
        </div>

        <p>開始感受到炎炎夏日的威力,最適合來道麻辣開胃的川味料理,溫順椒香拌著麵條及軟嫩的雞腿肉,爽脆的黃瓜,交織出豐富層次~另人純垂涎三尺的美味</p>
        <!--<ul>-->
          <!--<li><span class="glyphicon glyphicon glyphicon-user"></span>作者名称</li>-->
          <!--<li><span class="glyphicon glyphicon glyphicon-heart"></span>点赞数</li>-->
          <!--<li><span class="glyphicon glyphicon glyphicon-comment"></span>评论数</li>-->
        <!--</ul>-->
      </el-col>
      <!--右边文章推荐部分-->
      <el-col class="ArticleRemRight" :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
        <el-card @click.native="todetail" shadow="hover" v-for="(o,index) in homepageArt" :key="index" v-if="index < 3">
          <router-link :to="`/article_detail/${o.articleId}`">
            <el-col :span="10">
              <img width="100px" :src="o.articleCoverImg" alt="">
            </el-col>
            <el-col :span="14">
              <span>{{o.articleName}}</span>
              <ul>
                <li><span class="glyphicon glyphicon glyphicon-user"></span>{{o.authorName}}</li>
                <li><span class="el-icon-star-on"></span>{{o.articlePraiseNum}}</li>
              </ul>
            </el-col>
          </router-link>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "SowingMap",
    data() {
      return {
        imgs: [
          {pic: require('../../assets/meal1.jpg')},
          {pic: require('../../assets/meal2.jpg')},
          {pic: require('../../assets/meal3.jpg')}
        ],
        reArr: [],
        homepageArt: {},
      }
    },
    mounted() {
      //获取所有的菜谱简介
      this.$axios.get('http://localhost:3000/recipes/all')
        .then((res) => {
          this.$store.state.recipeBrief = res.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      //获取获取文章推荐
      this.$axios.get("http://localhost:3000/community/article/all")
        .then((res) => {
          this.homepageArt = res.data.data;
        }).catch((err) => {
        console.log(err);
      });

    }
  }
</script>

<style scoped>
  /*轮播图部分开始*/
  #Sowingmap {
    margin-top: 40px;
  }

  #Sowingmap .block {
    width: 100%;
  }

  #Sowingmap .block img {
    height: 460px;
  }

  #Sowingmap .el-col p {
    width: 90%;
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
    color: #FF7979;
  }

  /*轮播图部分结束*/

  /*右边文章推荐部分开始*/
  #Sowingmap .ArticleRemRight .el-card {
    padding: 10px;
    margin-bottom: 10px;
  }

  #Sowingmap .ArticleRemRight .el-card ul span {
    font-size: 14px;
  }

  /*右边文章推荐部分结束*/
</style>
