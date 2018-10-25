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
          "http://site.meishij.net/r/241/19/8567491/s8567491_148292490436361.jpg",
          "https://s1.st.meishij.net/r/245/13/2378495/s2378495_152583854223746.jpg",
          "https://s1.st.meishij.net/r/216/197/6174466/s6174466_153562539934985.jpg"
        ],
        recipeRcomId: [145, 215, 8],
        recipesRName: ["培根卷虾仁披萨", "小玛琳蛋糕", "辣炒相顾根"],
        recipesRAuthor: ["秋分0923", "搬个凳子看戏08", "心随彧动"],

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
            console.log(rcData[i]);
            this.recipesRImg.push("https://cp1.douguo.com/upload/caiku/5/6/9/yuan_5698cb4e6331389fd3de25f746f88299.jpg");
            this.recipesRName.push("草莓蛋糕卷");
            this.recipesRAuthor.push("NB轮回");
            this.recipeRcomId.push(272);
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
    height: 200px;
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
