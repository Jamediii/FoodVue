<template>
  <!--最受欢迎食谱部分-->
  <div id="popRecipes">
    <el-row class="bg1">
      <p></p>
      <h2>最受欢迎食谱</h2>
      <el-col>
        <el-col>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="4" style="margin: 20px 10px;" v-for="(o, index) in recipepop" :key="index" v-if="index < 4">
            <router-link :to="`recipe_detail/${o.detailsId}`">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="o.recipeCoverImg" class="image">
                <div style="padding: 14px;">
                  <span>{{o.recipeName}}  <span style="color:#FF7979;" class="glyphicon glyphicon glyphicon-heart"></span>  {{o.recipePraiseNum}}</span>
                  <div class="bottom clearfix">
                    <p><span style="color:#FF7979;" class="glyphicon glyphicon glyphicon-user"></span>   {{o.accountName}}</p>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PopularRecipes",
    data() {
      return {
        recipepop:[],
      }
    },
    mounted() {
      //获取排序后所有菜谱的信息
      this.$axios.get('http://localhost:3000/recipes/order')
        .then((res) => {
          this.$store.state.RecipeRecom = res;
          this.recipepop = res.data.data;
          console.log(this.recipepop);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {}
  }
</script>

<style scoped>
  #popRecipes {
    margin-top: 20px;
    position: relative;
  }

  #popRecipes .bg1 {
    height: 540px;
    background: url("../../assets/bg_pic.png") center no-repeat;
  }

  #popRecipes .bg1 > p {
    width: 100px;
    height: 100px;
    background: url("../../assets/popRecipeIcon.png") center no-repeat;
    margin: 10px auto;
  }

  #popRecipes .bg1 img {
    width: 100%;
    height: 200px;
  }

  #popRecipes .bg1 h2 {
    text-align: center;
    font-size: 40px;
    margin-top: 20px;
  }


</style>
