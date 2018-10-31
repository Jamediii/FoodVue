<template>
  <div>
    <!-- 没有食谱情况下 -->
    <div v-if="recipesY.recipe.length === 0 && recipesY.dielt.length === 0 && recipesN.length === 0" class="no-content">
      <span>你还拥有自己的菜谱,赶快去</span>
      <router-link to="/menu" class="toRouter">发表新菜谱呀(ง •_•)ง</router-link>
    </div>

    <!-- 有食谱情况下 -->
    <div v-else>
      <el-row>
        <el-col :span="8">
          <!-- 过审菜谱 -->
          <div
            class="boxFater"
            v-if="recipesY.recipe.length > 0"
            v-for="(data,key) in recipesY.recipe">
            <div class="receipeBox" @click="toDetailed(data.detailsId)">
              <div class="receipeLeft">
                <i><img src="../../../assets/审核通过.png" alt=""></i>
                <img :src="data.recipeCoverImg" :alt="data.recipeName">
                <div class="receipeRight">
                  <div class="receipeName">
                    <span>{{data.recipeName}}</span>
                  </div>
                  <div class="receipeBrief">
                    <div>
                      {{data.recipeBrief}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div
            class="boxFater"
            v-if="recipesY.dielt.length > 0"
            v-for="(data,key) in recipesY.dielt">
            <div class="receipeBox" @click="toRecipesDetailed(data.dietId)">
              <div class="receipeLeft">
                <i><img src="../../../assets/审核通过.png" width="100%" alt=""></i>
                <img :src="data.dietPhoto" width="30%" :alt="data.dietTitle">
                <div class="receipeRight">
                  <div class="receipeName">
                    <span>{{data.dietTitle}}</span>
                    <span class="releaseTime">{{data.releaseTime}}</span>
                  </div>
                  <div class="receipeBrief">
                    <div>
                      {{data.dietIntroduce}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- 未过审菜谱 -->
          <div
            class="boxFater"
            v-for="(data,key) in recipesN">
            <div class="receipeBox">
              <div class="receipeLeft">
                <i><img src="../../../assets/审核中.png" width="100%" alt=""></i>
                <img :src="data.dietPhoto" :alt="data.dietTitle">
                <div class="receipeRight">
                  <div class="receipeName">
                    <span>{{data.dietTitle}}</span>
                    <span class="releaseTime">{{data.releaseTime.substring(0,10)}}</span>
                  </div>
                  <div class="receipeBrief">
                    <div v-if="data.dietIntroduce">
                      {{data.dietIntroduce}}
                    </div>
                    <div v-else>
                      还没有做任何的描述！
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // 显示菜谱
  export default {
    inject: ['reload'],
    name: "UserRecipes",
    data() {
      return {
        // 未过审菜谱信息
        recipesN: '',
        // 过审菜谱信息
        recipesY: {
          recipe: '',
          dielt: ''
        },
      }
    },
    props: ['userid'], // 我的Id
    // 页面挂载 -- 执行
    mounted() {
      let userId = this.userid;
      // 过审菜谱
      this.$axios.get(`${$LH.url}/recipes/users/${userId}`)
        .then((result) => {
          this.recipesY.recipe = result.data.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
      // 未过审菜谱
      this.$axios.get(`${$LH.url}/operat/${userId}`)
        .then((result) => {
          // 过审菜谱
          this.recipesY.dielt = result.data.data[0];
          // 未过审菜谱
          this.recipesN = result.data.data[1];
        })
        .catch((err) => {
          console.log(err.message);
        });
      // 评论数 (过审菜谱才有)
      this.$axios.post(`${$LH.url}/comment`, {});
    },
    methods: {
      // 过审菜谱
      toDetailed(detailsId) {
        this.$router.push(`/recipe_detail/${detailsId}`);
      },
      toRecipesDetailed(detailsId) {
        this.$router.push(`/user_recipe/${detailsId}`);
      },
    },
    watch: {
      '$route': function (to, from) {
        this.reload();
      },
    },

  }
</script>

<style scoped>
  /* 没有菜谱 */
  .no-content {
    text-align: center;
    line-height: 300px;
  }

  .no-content a:hover {
    color: red;
  }

  .toRouter {
    font-size: 20px;
    font-weight: bold;
  }

  /* 有菜谱了 */
  .el-row > div {
    position: relative;
  }

  .boxFater {
    padding: 20px;
  }

  .receipeBox {
    margin-bottom: 20px;
    padding: 8px;
    border: 1px outset #999999;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  /* 过审图标 */
  i {
    position: absolute;
    font-style: normal;
    background-size: cover;
    width: 120px;
    height: 50px;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
    opacity: 0;
  }

  /* 背景的阴影 */
  .receipeBox:hover {
    animation: receipeY 400ms ease-out;
    /* 设置停留在最后一帧 */
    animation-fill-mode: forwards;
  }

  @keyframes receipeY {
    from {
      box-shadow: 0 0;
    }
    to {
      box-shadow: 3px 3px 10px #666666;
    }
  }

  .receipeBox:hover i {
    animation: iShow 400ms ease-out;
    animation-fill-mode: forwards;
  }
  
  @keyframes iShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .receipeLeft {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .receipeLeft img {
    width: 100%;
    height: 100%;
  }
  
  .receipeRight {
    width: 96%;
    height: 100px;
    position: absolute;
    padding: 5px;
    color: whitesmoke;
    right: 8px;
    bottom: -200px;
    background: rgba(0, 0, 0, 0.2);
  }

  /* 右边的划过 */
  .receipeBox:hover .receipeRight {
    animation: receipeRight 200ms ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes receipeRight {
    from {
      bottom: -200px;
    }
    to {
      bottom: 10px;
    }
  }

  /* 简介 */
  .receipeBrief {
    text-align: right;
    width: 100%;
    padding-top: 10px;
  }

  .receipeBrief > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* 标题 */
  .receipeName > span {
    /*font-size: 30px;*/
    cursor: pointer;
  }

  /* 时间 */
  span.releaseTime {
    text-align: right;
    font-size: 16px;
  }
</style>
