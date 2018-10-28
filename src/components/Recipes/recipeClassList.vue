<template>
  <!--菜谱分类列表详情-->
  <div id="recipeCList" class="w">
    <p style="height:20px;"></p>
    <el-row :gutter="20">
      <!--右侧菜谱部分-->
      <el-col :span="18">
        <el-header>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}</el-header>
        <el-main style="padding:0">
          <div id="wrap">
            <div style="display: inline-block" class="box" v-for="o in list">
              <div class="info">
                <div class="pic"><img :src="o.recipeCoverImg" alt=""></div>
                <div class="title">
                  <router-link :to="`/recipe_detail/${o.detailsId}`">
                    <p>{{o.recipeName}}</p>
                  </router-link>
                </div>
                <span class="glyphicon glyphicon glyphicon-user"></span>{{o.accountName}}
                <span class="glyphicon glyphicon glyphicon-heart"></span>{{o.recipePraiseNum}}
              </div>
            </div>
          </div>
          <el-alert v-if="isButtomShow"
            title="不好意思已经到底咯"
            type="warning">
          </el-alert>
        </el-main>
      </el-col>
      <!--右侧文章作者推荐-->
      <el-col class="rclRight" :span="6">
        <div class="grid-content">
          <h3>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}作者推荐</h3>
          <el-card shadow="never" class="box-card" v-for="(o,index) in list" :key="index" v-if="index <5">
            <div class="text item">
              <el-col :span="10">
                <img :src="o.headPhoto" alt="">
              </el-col>
              <el-col :span="10">
                <p>{{o.accountName}}</p>
              </el-col>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {

    inject: ['reload'],
    name: "recipeClassList",
    data() {
      return {
        recipeClassOne: [],//所有的数据
        recipeClassName: "",//菜谱分类对应的名称
        id: this.$route.params.recipeClassifyId,
        isButtomShow:false,
        //瀑布流
        list: [],
        limit: 9,
        page: 1,
      }
    },
    mounted() {
      //监听滚动事件
      window.addEventListener("scroll", this.loadMore, true);
      this.get();
    },
    watch: {
      '$route': function (to, from) {
        this.reload();
      },
    },
    methods: {

      //瀑布流的方法
      get() {
        this.$axios.get(`${$LH.url}/recipes/classify/${this.$route.params.recipeClassifyId}`)
          .then((res) => {
              this.recipeClassName = res.data.data[0].recipeClassifyName;
              if (this.page == 1) {
                for (var i = 0; i < this.limit * this.page; i++) {
                  if (res.data.data[i]) {
                    this.list.push(res.data.data[i]);
                  } else {
                   this.isButtomShow=true;
                  }

                }
              } else {
                for (var i = this.limit * (this.page - 1); i < this.limit * this.page; i++) {
                  if (res.data.data[i]) {
                    this.list = this.list.concat(res.data.data[i])
                  }
                  else {
                    this.isButtomShow=true;
                  }
                }
              }
            }
          ).catch((err) => {
          console.log(err);
        })
      },
      loadMore() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          var clientHeight = document.documentElement.clientHeight; //document.documentElement获取数据
          var scrollTop = document.documentElement.scrollTop; //document.documentElement获取数据
          var scrollHeight = document.documentElement.scrollHeight;//document.documentElement获取数据
          if (clientHeight + scrollTop + 20 >= scrollHeight) {
            this.page++;
            this.get();
          }
        }, 13);
      }


    },
  }
</script>

<style scoped>
  #recipeCList .el-header {
    background-color: #8cccc1;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    color: #fff;
  }

  #recipeCList .rclLeft img {
    height: 260px;
    width: 100%;
    margin-bottom: 20px;
  }

  #recipeCList .rclLeft .el-col p span {
    color: #FF7979;
  }

  #recipeCList .rclRight h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: block;
    font-size: 16px;
    font-weight: normal;
    padding: 0 20px;
    background-color: #8cccc1;
    color: #fff;
    margin-top: 0;
    margin-bottom: 20px;
  }

  #recipeCList .rclRight img {
    height: 80px;
    width: 100%;
    margin-bottom: 20px;
  }

  /*瀑布流开始*/
  img {
    border: none;
  }

  a {
    text-decoration: none;
    color: #444;
  }

  a:hover {
    color: #999;
  }

  #title {
    width: 600px;
    margin: 20px auto;
    text-align: center;
  }

  /* 定义关键帧 */
  @-webkit-keyframes shade {
    from {
      opacity: 1;
    }
    15% {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @-moz-keyframes shade {
    from {
      opacity: 1;
    }
    15% {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @-ms-keyframes shade {
    from {
      opacity: 1;
    }
    15% {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @-o-keyframes shade {
    from {
      opacity: 1;
    }
    15% {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes shade {
    from {
      opacity: 1;
    }
    15% {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  /* wrap */
  #wrap {
    width: auto;
    height: auto;
    margin: 0 auto;
    position: relative;
  }

  #wrap .box {
    width: 307px;
    height: auto;
    padding: 10px;
    border: none;
    float: left;
    margin-right: 28px;
  }

  #wrap .box .info {
    width: 307px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 11px #666;
    background: #fff;
  }

  #wrap .box .info .pic {
    width: 280px;
    height: auto;
    margin: 0 auto;
    padding-top: 10px;
  }

  #wrap .box .info .pic:hover {
    -webkit-animation: shade 3s ease-in-out 1;
    -moz-animation: shade 3s ease-in-out 1;
    -ms-animation: shade 3s ease-in-out 1;
    -o-animation: shade 3s ease-in-out 1;
    animation: shade 3s ease-in-out 1;
  }

  #wrap .box .info .pic img {
    width: 280px;
    border-radius: 3px;
  }

  #wrap .box .info .title {
    width: 280px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    /*text-align: center;*/
    color: #666;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
  }

</style>
