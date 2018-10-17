<template>
  <!--菜谱随意逛部分-->
  <div id="recipesComm">
    <el-row class="inner-RC">
      <el-col class="irc-first" :span="24">
        <h2>总有一款适合你!</h2>
        <p>还拿不定主意吗？过来看看今日的菜谱推荐</p>
        <el-col @click.native="chg"><i class="el-icon-refresh"></i></el-col>
      </el-col>

      <!--切换显示两个菜谱-->
      <el-col v-show="isShowRC" class="show-rc-two" :span="24">
        <el-col  :span="6" :push=5 v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/popRecipeIcon.png" class="image">
            <div style="padding: 14px;">
              <span>菜谱名字</span>
              <div class="bottom clearfix">
                <p>作者名字</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>

      <!--切换显示三个菜谱-->
      <el-col v-show="!isShowRC" class="show-rc-three" :span="24">
        <el-col  :span="6" :push=1 v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/popRecipeIcon.png" class="image">
            <div style="padding: 14px;">
              <span>菜谱名字</span>
              <div class="bottom clearfix">
                <p>作者名字</p>
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
    data(){
      return {
        isShowRC:true
      }
    },
    methods:{
      chg(){
        this.isShowRC=!this.isShowRC;
      }
    }
  }
</script>

<style scoped>
  #recipesComm {
    height: 500px;
    padding-top: 30px;
    color: #fff;
  }

  #recipesComm .inner-RC h2, #recipesComm .inner-RC p, #recipesComm .inner-RC .el-col {
    text-align: center;
  }

  #recipesComm .inner-RC h2 {
    font-size: 40px;
  }

  #recipesComm .inner-RC .irc-first>p {
    margin-top: 20px;
    font-size: 20px;
  }

  #recipesComm .inner-RC .irc-first {
    font-size: 60px;
  }
</style>
