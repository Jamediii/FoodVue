<template>
  <div>
    <el-header>热门菜品</el-header>
    <el-main>
      <el-row :gutter="20" v-for="(item,index) in recommendList" :key="index" v-if="item.detailsId>41 && item.detailsId<47">
        <el-col :span="10">
          <router-link :to="{path:'/recipe_detail/' + item.detailsId}">
            <img :src=item.recipeCoverImg>
          </router-link>
        </el-col>
        <el-col :span="14">
          <div>
            <router-link :to="{path:'/recipe_detail/' + item.detailsId}"><p class="title">{{item.recipeName}}</p>
            </router-link>
            <p>{{item.recipeBrief}}
              <span>…</span>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-main>

  </div>
</template>

<script>
  export default {
    name: "Recommend",
    data() {
      return {
        recommendList: [],
      }
    },
    created() {
      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/order`)
        .then((res) => {
          var allData = res.data.data;
          this.recommendList = allData;
          for (var i = 0; i < this.recommendList.length; i++) {
            this.recommendList[i].recipeName = this.recommendList[i].recipeName.substr(0, 12);
            this.recommendList[i].recipeBrief = this.recommendList[i].recipeBrief.substr(0, 23);
          }
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
  div{
    font-size: 16px;
  }
  .title{
    font-size: 16px;
    width: 75%;
    height: 35px;
    line-height: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-space:nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    /*word-break: break-all;  !* 内容自动换行 *!*/
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  .el-row {
    padding: 10px;
    border-bottom: 1px solid gainsboro;
  }

  .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 22px;
    color: white;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
  }
</style>
