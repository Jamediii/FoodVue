<template>
  <!--模糊查询的列表-->
  <div id="fuzzysearch" class="w">
    <p style="height:20px;"></p>
    <el-row :gutter="20">
      <!--右侧菜谱部分-->
      <el-col :span="18">
        <el-header class="headercss">>>&nbsp;&nbsp;搜索结果</el-header>
        <el-main id="main" style="padding:0">
          <div id="wrap">
            <div  class="box" v-for="o in matchString">
              <div class="info">
                <div class="pic"><img :src="o.img" alt=""></div>
                <div class="title">
                  <router-link v-if="mathShow" :to="`/recipe_detail/${o.id}`">
                    <p>{{o.name}}</p>
                  </router-link>
                  <router-link v-if="!mathShow" :to="`/fhuser/${o.id}`">
                    <p>{{o.name}}</p>
                  </router-link>
                </div>
              </div>
              <br/>
            </div>
          </div>
        </el-main>
      </el-col>
      <!--右侧文章作者推荐-->
      <el-col class="rclRight" :span="6">
        <div class="grid-content">
          <el-header class="headercss">&nbsp;&nbsp;热门菜品</el-header>
          <el-card shadow="never" class="box-card" v-for="(o,index) in hotRecipe" :key="index" v-if="index <5">
            <div class="text item">
              <el-col :span="10">
                <img  :src="o.recipeCoverImg" alt="">
              </el-col>
              <el-col :span="11">
                <router-link :to="`/recipe_detail/${o.detailsId}`">
                  <p>{{o.recipeName}}</p>
                </router-link>

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
    name: "FuzzySearch",
    data() {
      return {
        matchString: [],
        mathShow: true,
        hotRecipe:[],
      }
    },
    watch: {
      matchString() {
        return this.matchString;
      }
    },
    mounted() {

      //获取穿过来的值
      this.$nextTick(() => {
        var recipeSearch = sessionStorage.getItem('sendMathString');
        this.matchString = JSON.parse(recipeSearch);
        this.mathShow = this.matchString[0].mathSatate === 1 ? true : false;
        // console.log(this.matchString);
      });

      //根据点赞量获取菜谱
      this.$axios.get(`${$LH.url}/recipes/order`).then((res) => {
        this.hotRecipe=res.data.data;
      }).catch((err)=>{
        console.log(err);
      })

    }
  }
</script>

<style scoped>

  #wrap{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content: flex-start;
    align-items:center;
    align-content: flex-start;
  }

  #fuzzysearch #main {
    margin-top: 20px;
  }

  img {
    border: none;
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
    padding: 5px;
    margin-right: 10px;
    text-align: center;
  }

  #wrap .box .info {
    width: 258px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 11px #666;
    background: #fff;
  }

  #wrap .box .info .pic {
    width: 238px;
    /*height: 200px;*/
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
    width: 238px;
    border-radius: 3px;
  }

  #wrap .box .info .title {
    width: 238px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    /*text-align: center;*/
    color: #666;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
  }

  /*右边热门菜谱推荐部分*/
  #fuzzysearch .rclRight .text img{
    width: 100px;
    height: 70px;
    margin-bottom: 20px;
  }
</style>
