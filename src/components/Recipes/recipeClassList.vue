<template>
  <!--菜谱分类列表详情-->
  <div id="recipeCList" class="w">
    <p style="height:20px;"></p>
    <el-row :gutter="20">
      <!--右侧菜谱部分-->
      <el-col :span="18" :xs="24" :sm="24" :md="22" :lg="17" :xl="18">
        <el-header>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}</el-header>
        <div id="main">
          <Waterfall id="wrap"
                     :align="Waterfall.align"
                     style="margin: 0 0;max-width: 100%"
                     :gutterWidth="Waterfall.gutterWidth"
                     :maxCol="Waterfall.maxCol">
            <WaterfallItem
              class="box box-item"
              v-for="(o,key) in list"
              :width="WaterfallItem.width">
                <div class="info"
                     :key="key">
                  <div class="pic animated flipInX">
                    <img :src="o.recipeCoverImg" alt="">
                  </div>
                  <div class="title">
                    <router-link :to="`/recipe_detail/${o.detailsId}`">
                      <p>{{o.recipeName}}</p>
                    </router-link>
                  </div>
                  <span class="glyphicon glyphicon glyphicon-user"></span>{{o.accountName}}
                  <span class="glyphicon glyphicon glyphicon-heart"></span>{{o.recipePraiseNum}}
                </div>
            </WaterfallItem>
          </Waterfall>
        </div>
        <el-alert v-if="isButtomShow"
                  title="不好意思已经到底咯"
                  type="warning">
        </el-alert>
      </el-col>
      <!--右侧文章作者推荐-->
      <el-col class="rclRight hidden-xs-only hidden-sm-only hidden-md-only" :span="6">
        <div class="grid-content">
          <h3>逛菜谱&nbsp;&nbsp;>>&nbsp;&nbsp;{{recipeClassName}}作者推荐</h3>
          <el-card shadow="never"
                   class="box-card"
                   v-for="(o,index) in rankingUser"
                   :key="index"
                   v-if="index <5"
                   @click.native="toUserInfo(o.fansId)">
            <div class="text item">
              <el-col :span="12">
                <img v-if="index === 0" src="../../assets/排名1.png" alt="">
                <img v-else-if="index === 1" src="../../assets/排名2.png" alt="">
                <img v-else-if="index === 2" src="../../assets/排名3.png" alt="">
                <img v-else-if="index === 3" src="../../assets/排名4.png" alt="">
                <img v-else-if="index === 4" src="../../assets/排名5.png" alt="">
                <img :src="o.headPhoto" alt="">
              </el-col>
              <el-col :span="8">
                <div class="sex" style="overflow: hidden">
                  <span style="float: left">{{o.accountName}}</span>
                  <img v-if="o.sex==='女'" src="../../assets/性别女.png" style="float: left" alt="">
                  <img v-else src="../../assets/性别男.png" alt="">
                </div>
                <p><img src="../../assets/粉丝.png" alt="">{{o.fansNum}}</p>
              </el-col>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Waterfall, WaterfallItem} from 'vue2-waterfall';
  export default {
    inject: ['reload'],
    name: "recipeClassList",
    data() {
      return {
        recipeClassOne: [],//所有的数据
        recipeClassName: "",//菜谱分类对应的名称
        rankingUser: [], // 用户拥有粉丝数排名
        isButtomShow: false,
        //瀑布流
        list: [],
        limit: 9,
        page: 1,
        Waterfall: {
          align: 'center',
          maxCol: 3,
          gutterWidth: 5,
        },
        WaterfallItem: {
          width: 360,
        }
      }
    },
    components: {
      Waterfall, WaterfallItem
    },
    mounted() {
      // 获取该分类的菜谱
      this.$axios.get(`${$LH.url}/recipes/classify/${this.$route.params.recipeClassifyId}`)
        .then((res) => {
            this.recipeClassOne = res.data.data;
            this.recipeClassName = res.data.data[0].recipeClassifyName;
            this.get();
          }
        ).catch((err) => {
        console.log(err);
      });

      // 用户按粉丝数排名
      this.$axios.get(`${$LH.url}/praiseNum/rankingUser`)
        .then((res) => {
          this.rankingUser = res.data.data.slice(0, 5);
          console.log(this.rankingUser);
        })
        .catch()

      //监听滚动事件
      window.addEventListener("scroll", this.loadMore, true);
    },
    watch: {
      '$route': function (to, from) {
        this.reload();
      },
    },
    methods: {
      //瀑布流的方法
      get() {
        if (this.page == 1) {
          for (var i = 0; i < this.limit * this.page; i++) {
            if (this.recipeClassOne[i]) {
              this.list.push(this.recipeClassOne[i]);
            } else {
              this.isButtomShow = true;
            }

          }
        } else {
          for (var i = this.limit * (this.page - 1); i < this.limit * this.page; i++) {
            if (this.recipeClassOne[i]) {
              this.list = this.list.concat(this.recipeClassOne[i])
            }
            else {
              this.isButtomShow = true;
            }
          }
        }
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
      },
      // 去用户详细界面
      toUserInfo(userId) {
        this.$router.push(`/fhuser/${userId}`);
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

  #recipeCList .rclRight .sex {
    width: 500px;
    padding-top: 5px;
  }

  #recipeCList .rclRight .sex > img {
    width: 23px;
    height: 23px;
    margin-bottom: 0;
  }

  #recipeCList .rclRight p {
    padding-top: 30px;
    vertical-align: bottom;
  }

  #recipeCList .rclRight p>img {
    margin-bottom: 0;
    margin-right: 5px;
    width: 23px;
    height: 23px;
    vertical-align: center;
  }

  .item>div:first-child>img:first-child {
    float: left;
    width: 25% !important;
    height: 25% !important;
    margin-right: 10px;
  }

  .item>div:first-child>img:last-child {
    float: left;
    width: 50% !important;
    /*width: 153px;*/
    /*padding-left: 60px !important;*/
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
    width: 350px;
    height: auto;
    padding: 20px 10px 10px 10px;
    border: none;
    /*float: left;*/
    margin-right: 28px;
  }

  #wrap .box .info {
    /*width: 307px;*/
    height: auto;
    border-radius: 8px;
    padding-bottom: 10px;
    box-shadow: 0 0 11px #666;
    background: #fff;
  }

  #wrap .box .info .pic {
    width: 100%;
    height: auto;
    /*margin: 0 auto;*/
    padding: 10px;
  }

  /*#wrap .box .info .pic:hover {*/
    /*-webkit-animation: shade 3s ease-in-out 1;*/
    /*-moz-animation: shade 3s ease-in-out 1;*/
    /*-ms-animation: shade 3s ease-in-out 1;*/
    /*-o-animation: shade 3s ease-in-out 1;*/
    /*animation: shade 3s ease-in-out 1;*/
  /*}*/

  #wrap .box .info .pic img {
    width: 100%;
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
