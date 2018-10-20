<template>
  <div class="block">
    <!--<span class="demonstration">Click 指示器触发</span>-->
    <!--<el-carousel trigger="click" height="600px">-->
      <!--<el-carousel-item v-for="item in imgList" :key="item.id">-->
        <!--<router-link to="/recipe_detail"><img :src=item.idView></router-link>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->

    <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <router-link to="/recipe_detail"><img :src=item.idView></router-link>
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
                recipeId:'271',
                idView:'https://tokyo-kitchen.icook.network/uploads/recipe/cover/172428/large_a0c06dfc2edb7388.jpg'
              },
              {
                id:1,
                idView:'http://i2.chuimg.com/89245e2689e811e6b87c0242ac110003_2048w_1365h.jpg?imageView2/2/w/660/interlace/1/q/90'
              },
              {
                id:2,
                idView:'http://i2.chuimg.com/b6aa3cfa8ab811e6b87c0242ac110003_1440w_1080h.jpg?imageView2/2/w/660/interlace/1/q/90'
              },
            ]
          }
      }
    }
</script>

<style scoped>
  img{
    width: 100%;
  }
  /*.el-carousel__item h3 {*/
    /*color: #475669;*/
    /*font-size: 14px;*/
    /*opacity: 0.75;*/
    /*margin: 0;*/
  /*}*/

  .el-carousel__item:nth-child(2n) {
    /*background-color: #99a9bf;*/
  }

  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #d3dce6;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }


</style>
