<template>
  <div>
    <!-- 没有食谱情况下 -->
    <div v-if="recipesY.length === 0 && recipesN.length === 0" class="no-content">
      <span>你还拥有自己的菜谱,赶快去</span>
      <router-link to="/menu" class="toRouter">发表新菜谱呀(ง •_•)ง</router-link>
    </div>

    <!-- 有食谱情况下 -->
    <div v-else>
      <el-row>
        <!-- 过审菜谱 -->
        <el-col :span="11">
          <div v-for="(data,key) in recipesY">
            <div class="receipeBox" @click="toDetailed(data.detailsId)">
              <div class="receipeLeft">
                <img :src="data.recipeCoverImg" width="30%" :alt="data.recipeName">
              </div>
              <div class="receipeRight">
                <div class="receipeName">
                  <span>{{data.recipeName}}</span>
                </div>
                <div class="receipeBrief">

                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 未过审菜谱 -->
        <el-col :span="11" :push="2">
          <div v-for="(data,key) in recipesN">

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
        recipesY: '',
      }
    },
    props: ['userid'], // 我的Id
    // 页面挂载 -- 执行
    mounted() {
      let userId = this.userid;
      // 未过审菜谱
      this.$axios.get(`${$LH.url}/operat/${userId}`)
        .then((result) => {
          this.recipesN = result.data.data;
          console.log(this.recipesN);
        })
        .catch((err) => {
          console.log(err.message);
        });
      // 过审菜谱
      this.$axios.get(`${$LH.url}/recipes/users/${userId}`)
        .then((result) => {
          this.recipesY = result.data.data;
          console.log(this.recipesY);
        })
        .catch((err) => {
          console.log(err.message);
        })
    },
    methods: {
      toDetailed(detailsId) {
        console.log(detailsId);
        this.$router.push(`/recipe_detail/${detailsId}`);
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
    margin-bottom: 10px;
    border: 1px solid #999999;
    position: relative;
    overflow: hidden;
  }
  .receipeBox:hover {
    animation: receipeY 300ms ease-in;
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

  .receipeName>span {
    font-size: 30px;
    cursor: pointer;
  }
</style>
