<template>
  <div class="block">
    <el-carousel :interval="4000" type="card" height="420px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <router-link :to="{path:'/recipe_detail/' + item.recipeId}">
            <img :src=item.idView>
          </router-link>
        </el-carousel-item>
    </el-carousel>

    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "LoopPic",
      data(){
          return{
            imgList:[
              {
                id:0,
                recipeId:'46',
                idView:'https://cp1.douguo.com/upload/caiku/a/f/c/600x400_af5229ec1157bd2be9f331ca6ac9810c.jpg'
              },
              {
                id:1,
                recipeId:'31',
                idView:'https://cp1.douguo.com/upload/caiku/d/e/b/600x400_de4616099ef08ca5cde07be86d10709b.jpg'
              },
              {
                id:2,
                recipeId:'42',
                idView:'https://cp1.douguo.com/upload/caiku/f/1/3/600x400_f116f92896e6d4917e660561a8399793.jpg'
              },
            ]
          }
      }
    }
</script>

<style scoped>
  img {
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

</style>
