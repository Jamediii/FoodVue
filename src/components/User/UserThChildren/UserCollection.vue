<template>
  <!--收藏部分-->
  <div id="collPart">
    <!-- 没有收藏情况下 -->
    <div v-if="!isArray" class="no-content">
      <span>{{recipesY}},赶快去收藏吧！</span>
    </div>

    <!-- 有收藏情况下 -->
    <div v-else-if="isArray">
      <el-row :gutter="12" v-for="(o,index) in recipesY">
        <el-col style="margin-top:10px;" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card shadow="always">
            <el-col :span="8">
              <img :src="o.recipeCoverImg" alt="">
            </el-col>
            <el-col :span="16">
              <h5>{{o.recipeName}}</h5>
              <p style="
             display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">{{o.recipeBrief}}</p>
            </el-col>

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // 显示收藏
  export default {
    name: "UserRecipes",
    data() {
      return {
        // 收藏信息
        recipesY: [],
        // 判断类型
        isArray: true
      }
    },
    // 页面挂载 -- 执行
    mounted() {
      //获取收藏信息
      var collectionRecipeId = localStorage.getItem("detailsIds");
      // console.log(collectionRecipeId);
      var arr =[];
      if(collectionRecipeId){
        arr = collectionRecipeId.split(',');
      }
      for(var i =0;i< arr.length;i++ ){
        this.$axios.get('http://localhost:3000/recipes/brief/'+arr[i])
          .then((result) => {
            this.recipesY.push(result.data.data[0]);
          }).catch((err) => {
          console.log(err.message);
        })
      }
      console.log(this.recipesY);

    },

  }
</script>

<style scoped>
  #collPart img{
    height: 100px;
  }
  .no-content {
    text-align: center;
    /*line-height: 300px;*/
  }

</style>
