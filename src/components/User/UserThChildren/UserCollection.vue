<template>
  <!--收藏部分-->
  <div id="collPart">
    <!-- 没有收藏情况下 -->
    <div v-if="isArray" class="no-content">
      <span>你还未收藏任何宝典呢!还不赶快去<router-link to="/">瞧瞧</router-link>? q(≧▽≦q)</span>
    </div>

    <!-- 有收藏情况下 -->
    <div v-else class="content">
      <div class="contRecipes">
        <span class="recipes-title">菜谱</span>
        <el-row :gutter="12">
          <el-col style="margin-top:10px; position: relative; cursor: pointer"
                  v-for="(o,index) in recipesY.collect"
                  :span="8"
                  @mouseover.native="getAnimate($event)"
                  @click.native.stop="toDetailed(o)">
            <el-card shadow="always">
              <el-col :span="9">
                <img :src="o.recipeCoverImg" width="100%" alt="">
              </el-col>
              <el-col :span="15">
                <h5 class="recipeName">{{o.recipeName}}</h5>
                <p v-if="o.recipeBrief"
                   style="
              display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">{{o.recipeBrief}}</p>
                <p v-else
                   style="
              display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">该作品还未有详细的介绍</p>
                <span class="cancelColl" @click.stop="collection(o)">×</span>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div  class="contRecipes">
        <span class="recipes-title">达人推荐</span>
        <el-row :gutter="12" >
          <el-col style="margin-top:10px; position: relative; cursor: pointer"
                  v-for="(o,index) in recipesY.collectUser"
                  :span="8"
                  @click.native.stop="toDetailed(o)">
            <el-card shadow="always">
              <el-col :span="9">
                <img :src="o.dietPhoto" width="100%" alt="">
              </el-col>
              <el-col :span="15">
                <h5 class="recipeName">{{o.dietTitle}}</h5>
                <p v-if="o.dietIntroduce"
                   style="
              display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">{{o.dietIntroduce}}</p>
                <p v-else
                   style="
              display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">该作品还未有详细的介绍</p>
                <span class="cancelColl" @click.stop="collection(o)">×</span>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  // 显示收藏
  export default {
    name: "UserRecipes",
    data() {
      return {
        // 用户Id
        userId: localStorage.getItem('userId'),
        // 收藏信息
        recipesY: {
          collect: [],
          collectUser: []
        },
        // 判断类型
        isArray: true,
        isCollect: false,
        isCollectUser: false,
      }
    },
    // 页面挂载 -- 执行
    mounted() {
      // 获取用户的userId
      let userId = this.userId;
      //获取收藏信息
      let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
      for (let i = 0; i < detailsIdsArray.length; i++) {
        if (detailsIdsArray[i].userId === userId) {
          if (detailsIdsArray[i].collect.length > 0) {
            this.$axios.get(`${$LH.url}/recipes/brief/${JSON.stringify(detailsIdsArray[i].collect)}`)
              .then(async (result) => {
                for (let i = 0; i < result.data.data.length; i++) {
                  await this.recipesY.collect.push(result.data.data[i][0]);
                }
                this.isArray = false;
              }).catch((err) => {
              console.log(err.message);
            })
          }
          if (detailsIdsArray[i].collectUser.length > 0) {
            this.$axios.get(`${$LH.url}/operat/getCollection/${JSON.stringify(detailsIdsArray[i].collectUser)}`)
              .then(async (result) => {
                for (let i = 0; i < result.data.data.length; i++) {
                  await this.recipesY.collectUser.push(result.data.data[i][0]);
                }
                this.isArray = false;
              }).catch((err) => {
              console.log(err.message);
            })
          }
        }
      }
    },
    methods: {
      // 取消收藏
      collection(detail) {
        // 获取Id
        let userId = this.userId;
        // 获取存储 -- 存在
        let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
        // 取消收藏 ---- 收藏过的情况下 detailsIdsArray存在的情况下
        for (let i = 0; i < detailsIdsArray.length; i++) {
          if (detailsIdsArray[i].userId === userId) {
            if (detail.detailsId) {
              for (let j = 0; j < detailsIdsArray[i].collect.length; j++) {
                if (detailsIdsArray[i].collect[j] === detail.detailsId) {
                  this.$confirm('您老确定要这样子做吗?(。_。)', '取消收藏', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$notify({
                      title: '成功',
                      message: '取消收藏成功!(っ °Д °;)っ',
                      type: 'success'
                    });
                    detailsIdsArray[i].collect.splice(j, 1);
                    localStorage.setItem("detailsIds", JSON.stringify(detailsIdsArray));
                    this.recipesY.collect.splice(j, 1);
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '取消操作'
                    });
                  });
                }
              }
            } else {
              for (let j = 0; j < detailsIdsArray[i].collectUser.length; j++) {
                console.log(detailsIdsArray[i].collectUser[j]);
                console.log(detail.dietId);
                if (detailsIdsArray[i].collectUser[j] === detail.dietId) {
                  this.$confirm('您老确定要这样子做吗?(。_。)', '取消收藏', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$notify({
                      title: '成功',
                      message: '取消收藏成功!(っ °Д °;)っ',
                      type: 'success'
                    });
                    detailsIdsArray[i].collectUser.splice(j, 1);
                    localStorage.setItem("detailsIds", JSON.stringify(detailsIdsArray));
                    this.recipesY.collectUser.splice(j, 1);
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '取消操作'
                    });
                  });
                }
              }
            }
          }
        }
      },
      // 去收藏表的详细页面
      toDetailed(detail) {
        if (detail.detailsId) {
          this.$router.push(`/recipe_detail/${detail.detailsId}`);
        } else {
          this.$router.push(`/user_recipe/${detail.dietId}`);
        }
      },
      // 鼠标经过时给样式
      getAnimate(e) {

      },
      // 鼠标离开时给样式
      leaveAnimate(e) {

      }
    },
    watch: {
      'recipesY.collectUser.length'(newLength) {
        if (newLength === 0 && this.recipesY.collect.length === 0) {
          this.isArray = true;
        }
      },
      'recipesY.collect.length'(newLength) {
        if (newLength === 0 && this.recipesY.collectUser.length === 0) {
          this.isArray = true;
        }
      }
    }
  }
</script>

<style scoped>
  #collPart img {
    height: 100px;
  }

  .no-content {
    text-align: center;
    line-height: 300px;
  }

  .no-content a {
    color: #337ab7;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
  }

  .no-content a:hover {
    color: red;
    text-decoration: underline;
  }

  .content p {
    font-size: 14px;
  }

  .el-card {
    padding-bottom: 20px;
  }

  h5.recipeName {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cancelColl {
    position: absolute;
    right: 15px;
    top: 0;
    cursor: pointer;
    z-index: 1000;
  }

  .cancelColl:hover {
    color: red;
    font-size: 25px;
  }

  div.contRecipes{
    padding:5px 30px 10px 30px;
    margin:50px;
    border:4px solid #ebcbbe;
  }
  span.recipes-title{
    display:block;
    width:150px;
    height:30px;
    position:relative;
    top:-20px;
    text-align: center;
    background: white;
  }

</style>
