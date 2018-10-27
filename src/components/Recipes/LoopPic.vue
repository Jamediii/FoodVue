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
                recipeId:'150',
                idView:'https://tokyo-kitchen.icook.network/uploads/recipe/cover/172428/large_a0c06dfc2edb7388.jpg'
              },
              {
                id:1,
                recipeId:'151',
                idView:'https://tokyo-kitchen.icook.network/uploads/recipe/cover/208916/large_fcb196f7acf86079.jpg'
              },
              {
                id:2,
                recipeId:'155',
                idView:'https://tokyo-kitchen.icook.network/uploads/recipe/cover/175203/large_1070dd4cf3a6697b.jpg'
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
