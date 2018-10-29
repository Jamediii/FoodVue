<template>
  <!--最受欢迎食谱部分-->
  <div id="popRecipes" class="w">
    <!--<div class="icon-title">每日编辑推荐</div>-->
    <el-header >>>&nbsp;&nbsp;每日编辑推荐</el-header>
    <el-row :gutter="20">
      <div>
        <!--<el-col :span="3">&nbsp;</el-col>-->
        <el-col class="showRecipe" :span="6" v-for="(o, index) in recipepop" :key="index" v-if="index < 8">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <img :src="o.recipeCoverImg" class="image im">
            <div style="padding: 14px;">
              <router-link :to="`recipe_detail/${o.detailsId}`">
                  <span>{{o.recipeName}}
                    <span style="color:#FF7979;" class="glyphicon glyphicon-heart"></span> {{o.recipePraiseNum}}</span>
              </router-link>
              <div class="bottom clearfix">
                by&nbsp;<span>{{o.accountName}}</span>
                <!--<button class="right" @click="addcollection(o.detailsId)">收藏</button>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  //导入收藏，数据传到本地
  import {collectionLS} from '../../assets/js/collectionLocalStorage.js'


  export default {
    name: "PopularRecipes",
    data() {
      return {
        recipepop: [],
      }
    },
    mounted() {
      //获取排序后所有菜谱的信息
      this.$axios.get(`${$LH.url}/recipes/order`)
        .then((res) => {
          this.$store.state.RecipeRecom = res;
          this.recipepop = res.data.data;
          console.log(this.recipepop);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      //收藏,将数据传到本地
      addcollection(id) {
        if (this.$store.state.user.state) {
          collectionLS.collection(id);
        } else {
          this.$router.push('/login');
        }
      },

    }
  }

</script>

<style scoped>
  #popRecipes {
    height: 680px;
    margin-top: 40px;
    position: relative;
  }

  #popRecipes img {
    width: 100%;
    height: 100%;
  }

  #popRecipes div.icon-title {
    font-size: 16px;
    color: #303133;
    margin-top: 20px;
  }

  #popRecipes .showRecipe {
    margin-top: 16px;
  }

  #popRecipes .showRecipe .el-card {
    border: 1px solid transparent;
    /*border-radius: 0;*/
  }
  #popRecipes .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    color:#fff;
  }

  .fontcolor {
    color: #303133;
  }

</style>
