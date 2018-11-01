<template>
  <!--菜谱随意逛部分-->
  <div id="recipesComm" class="w">
    <el-row class="inner-RC" :gutter="20">
      <el-col class="irc-first" :span="24">
        <h2>总有一款适合你!</h2>

        <p>还拿不定主意吗？过来看看今日的菜谱推荐</p>
        <el-col @click.native="chg"><i id="changRe" class=" el-icon-refresh"></i></el-col>
      </el-col>

      <!--切换显示两个菜谱-->
      <el-col style="margin-top: 80px;" v-show="isShowRC" class="show-rc-two showrc" :span="24">
        <el-col :span="6" :push="4" v-for="(o,index) in 3" :key="o">

          <el-card :body-style="{ padding: '0px' }">
            <img :src="recipesRImg[index]" class="image">
            <div style="padding: 14px;" class="left">
              <router-link :to="`recipe_detail/${recipeRcomId[index]}`">
                <span style="white-space: nowrap">{{recipesRName[index]}}</span>
              </router-link>
              <div class="bottom clearfix">
                <p>by&nbsp;{{recipesRAuthor[index]}}</p>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-col>

      <!--切换显示三个菜谱-->
      <el-col style="margin-top: 80px;" v-show="!isShowRC" class="show-rc-three showrc" :span="24">
        <el-col :span="6" v-for="(o, index) in 4" :key="o">

          <el-card :body-style="{ padding: '0px' }">
            <img :src="recipesRImg[index]" class="image">
            <div style="padding: 14px;" class="left">
              <router-link :to="`recipe_detail/${recipeRcomId[index]}`">
                <span>{{recipesRName[index]}}</span>
              </router-link>
              <div class="bottom clearfix">
                <p>by&nbsp;{{recipesRAuthor[index]}}</p>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "RecipesRecommends",
    data() {
      return {
        isShowRC: true,
        recipesRImg: [
          "https://cp1.douguo.com/upload/caiku/7/b/1/600x400_7b2d67f13bed858168fd1e45e55bae41.png",
          "https://cp1.douguo.com/upload/caiku/8/3/5/600x400_839382bc61546f87178f38c6432942b5.jpeg",
          "https://cp1.douguo.com/upload/caiku/6/6/6/600x400_662a97b83d14e55ecb2ac3be3bd56396.jpg"
        ],
        recipeRcomId: [50, 59, 21],
        recipesRName: ["胡萝卜鸡蛋饼", "椰汁红豆糕#雀巢营养早餐#", "紫菜包饭"],
        recipesRAuthor: ["Mi_manchi", "揪揪耳朵", "Queen_Chow"],

      }
    },
    methods: {
      chg() {
        this.isShowRC = !this.isShowRC;
        var rcData = this.$store.state.RecipeRecom.data.data;
        // console.log(rcData.length);
        var len = rcData.length - 1;
        var rom = Math.abs(parseInt(Math.random() * len));
        var start = rom - 10;
        this.recipesRImg = [];
        this.recipesRName = [];
        this.recipesRAuthor = [];
        this.recipeRcomId = [];
        // console.log(start);
        for (var i = start; i < rom; i++) {
          if (rcData[i]) {
            this.recipesRImg.push(rcData[i].recipeCoverImg);
            this.recipesRName.push(rcData[i].recipeName);
            this.recipesRAuthor.push(rcData[i].accountName);
            this.recipeRcomId.push(rcData[i].detailsId);
          } else {
            // console.log(rcData[i]);
            this.recipesRImg.push("https://cp1.douguo.com/upload/caiku/4/2/0/600x400_4241833e7dd7e4b041964353faadc300.jpg");
            this.recipesRName.push("史上最全寿司教程，学会交作业哟");
            this.recipesRAuthor.push("小菁同学");
            this.recipeRcomId.push(26);
          }
        }
      }
    }
  }
</script>

<style scoped>
  #recipesComm {
    height: 600px;
    padding-top: 30px;
    color: #fff;
  }

  #recipesComm .inner-RC h2, #recipesComm .inner-RC p, #recipesComm .inner-RC .el-col {
    text-align: center;
  }

  #recipesComm .inner-RC h2 {
    font-size: 30px;
  }

  #recipesComm .inner-RC .irc-first > p {
    margin-top: 20px;
    font-size: 18px;
  }

  #recipesComm .inner-RC .irc-first {
    font-size: 60px;
  }

  #recipesComm .inner-RC .showrc img {
    height: 100%;
    width: 100%;
  }

  /*旋转效果*/
  #recipesComm .irc-first {
    position: relative;
  }

  #recipesComm .irc-first #changRe {
    transition: all 1s;
    position: absolute;
    z-index: 999999999;
  }

  #recipesComm .irc-first #changRe:hover {
    transform: rotate(180deg);
  }

  /*#recipesComm .showrc .el-card img:hover {*/
  /*background-color: rgba(255,255,255,0.4);*/
  /*}*/


</style>
