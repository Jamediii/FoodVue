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
        <!-- 过审菜谱 -->
        <el-col :span="11">
          <div v-if="recipesY.recipe.length > 0" v-for="(data,key) in recipesY.recipe">
            <div class="receipeBox" @click="toDetailed(data.detailsId)">
              <i>审核通过</i>
              <div class="receipeLeft">
                <img :src="data.recipeCoverImg" width="30%" :alt="data.recipeName">
              </div>
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
          <div v-if="recipesY.dielt.length > 0" v-for="(data,key) in recipesY.dielt">
            <div class="receipeBox" @click="toRecipesDetailed(data.detailsId)">
              <i>审核通过</i>
              <div class="receipeLeft">
                <img :src="data.dietPhoto" width="30%" :alt="data.dietTitle">
              </div>
              <div class="receipeRight">
                <div class="receipeName">
                  <span>{{data.dietTitle}}</span>
                </div>
                <div class="receipeBrief">
                  <div>
                    {{data.dietIntroduce}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 未过审菜谱 -->
        <el-col :span="11" :push="2">
          <div v-for="(data,key) in recipesN">
            <div class="receipeBox" @click="toRecipesDetailed(data.detailsId)">
              <i>审核中</i>
              <div class="receipeLeft">
                <img :src="data.dietPhoto" width="30%" :alt="data.dietTitle">
              </div>
              <div class="receipeRight">
                <div class="receipeName">
                  <span>{{data.dietTitle}}</span>
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // 显示菜谱
  export default {
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
      toDetailed(detailsId) {
        this.$router.push(`/recipe_detail/${detailsId}`);
      },
      toRecipesDetailed() {
        this.$router.push(`/user_recipe/${detailsId}`);
      }
    }

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
  .receipeBox {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #999999;
    position: relative;
    overflow: hidden;
  }

  /* 过审图标 */
  .receipeBox > i {
    position: absolute;
    font-style: normal;
    color: red;
    width: 100px;
    height: 100px;
    z-index: 20000;
    right: 0;
    top: 0;
  }

  .receipeBox:hover {
    animation: receipeY 200ms ease-out;
    /* 设置停留在最后一帧 */
    animation-fill-mode: forwards;
  }

  @keyframes receipeY {
    from {
      box-shadow: 0 0;
    }
    to {
      box-shadow: 1px 1px 5px #666666;
    }
  }

  .receipeLeft {
    width: 100%;
    margin-right: 30px;
  }

  .receipeRight {
    position: absolute;
    left: 270px;
    top: 20px;
  }

  .receipeBrief {
    padding-top: 20px;
    padding-right: 20px;
  }

  .receipeName > span {
    font-size: 30px;
    cursor: pointer;
  }
</style>
