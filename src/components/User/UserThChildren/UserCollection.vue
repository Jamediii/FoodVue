<template>
  <!--收藏部分-->
  <div id="collPart">
    <!-- 没有收藏情况下 -->
    <div v-if="isArray" class="no-content">
      <span>你还未收藏任何宝典呢!还不赶快去<router-link to="/">瞧瞧</router-link>? q(≧▽≦q)</span>
    </div>

    <!-- 有收藏情况下 -->
    <div v-else>
      <el-row :gutter="12" v-for="(o,index) in recipesY.collect">
        <el-col style="margin-top:10px; position: relative; cursor: pointer" :span="8"
                @click.native.stop="toDetailed(o)">
          <el-card shadow="always">
            <el-col :span="8">
              <img :src="o.recipeCoverImg" alt="">
            </el-col>
            <el-col :span="14" :push="2">
              <h5>{{o.recipeName}}</h5>
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
      <el-row :gutter="12" v-for="(o,index) in recipesY.collectUser">
        <el-col style="margin-top:10px; position: relative; cursor: pointer" :span="8"
                @click.native.stop="toDetailed(o)">
          <el-card shadow="always">
            <el-col :span="8">
              <img :src="o.dietPhoto" alt="">
            </el-col>
            <el-col :span="14" :push="2">
              <h5>{{o.dietTitle}}</h5>
              <p style="
              display: -webkit-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp:2;margin-top:20px;">{{o.dietIntroduce}}</p>
              <span class="cancelColl" @click.stop="collection(o)">×</span>
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
        // 用户Id
        userId: localStorage.getItem('userId'),
        // 收藏信息
        recipesY: {
          collect: [],
          collectUser: []
        },
        // 判断类型
        isArray: true
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
          if (detailsIdsArray[i].collect) {
            console.log(detailsIdsArray[i].collect);
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
          if (detailsIdsArray[i].collectUser) {
            console.log(detailsIdsArray[i].collectUser);
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
        console.log(this.recipesY);
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
      }
    },
    watch: {
      'recipesY.length'(newLength) {
        if (newLength === 0) {
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

  .cancelColl {
    position: absolute;
    right: -10px;
    top: -20px;
    cursor: pointer;
    z-index: 1000;
  }

  .cancelColl:hover {
    color: red;
    font-size: 25px;
  }
</style>
