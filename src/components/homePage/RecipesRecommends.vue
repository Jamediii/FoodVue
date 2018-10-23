<template>
  <!--菜谱随意逛部分-->
  <div id="recipesComm">
    <el-row class="inner-RC">
      <el-col class="irc-first" :span="24">
        <h2>总有一款适合你!</h2>
        <p>还拿不定主意吗？过来看看今日的菜谱推荐</p>
        <el-col @click.native="chg"><i id="changRe" class=" el-icon-refresh"></i></el-col>
      </el-col>

      <!--切换显示两个菜谱-->
      <el-col v-show="isShowRC" class="show-rc-two showrc w" :span="24">
        <el-col :span="5" :push=6 v-for="(o,index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <router-link :to="`recipe_detail/${recipeRcomId[index]}`">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="recipesRImg[index]" class="image">
              <div style="padding: 14px;">
                <span>{{recipesRName[index]}}</span>
                <div class="bottom clearfix">
                  <p>{{recipesRAuthor[index]}}</p>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-col>

      <!--切换显示三个菜谱-->
      <el-col v-show="!isShowRC" class="show-rc-three showrc" :span="24">
        <el-col :span="4" :push=2 v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
          <router-link :to="`recipe_detail/${recipeRcomId[index]}`">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="recipesRImg[index]" class="image">
              <div style="padding: 14px;">
                <span>{{recipesRName[index]}}</span>
                <div class="bottom clearfix">
                  <p>{{recipesRAuthor[index]}}</p>
                </div>
              </div>
            </el-card>
          </router-link>
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
          "https://s1.st.meishij.net/r/245/13/2378495/s2378495_152583854223746.jpg"
        ],
        recipeRcomId: [145, 215],
        recipesRName: ["培根卷虾仁披萨", "小玛琳蛋糕"],
        recipesRAuthor: ["秋分0923", "搬个凳子看戏08"],

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
          this.recipesRImg.push(rcData[i].recipeCoverImg);
          this.recipesRName.push(rcData[i].recipeName);
          this.recipesRAuthor.push(rcData[i].accountName);
          this.recipeRcomId.push(rcData[i].detailsId);
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
    font-size: 40px;
  }

  #recipesComm .inner-RC .irc-first > p {
    margin-top: 20px;
    font-size: 20px;
  }

  #recipesComm .inner-RC .irc-first {
    font-size: 60px;
  }

  #recipesComm .inner-RC .showrc img {
    height: 200px;
    width: 100%;
  }

  /*#recipesComm .showrc .el-card img:hover {*/
  /*background-color: rgba(255,255,255,0.4);*/
  /*}*/
</style>
