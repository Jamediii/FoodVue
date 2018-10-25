<template>
  <!--菜谱详情-->
  <div id="container" class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-container>
          <el-header>
              <span style="font-weight: bold;font-size: 25px">
                {{recipeName}}
              </span>
          </el-header>

          <el-main>
            <img :src="recipeCoverImg">
          </el-main>

          <el-footer>
            <el-col :span="20">
                  <span style="-ms-text-overflow: ellipsis">
                    {{recipeBrief}}
                  </span>
            </el-col>
            <el-col :span="2">
              <el-button id="addColBtn" @click="addCollection" type="danger">收藏</el-button>
            </el-col>
            <!--</el-row>-->
          </el-footer>
        </el-container>
        <recipe-food-table></recipe-food-table>
        <recipe-step></recipe-step>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!--评论部分-->
      <el-col class="comment" :span="18" :offset="3">
        <p>评论专区</p>
        <el-input
          type="textarea"
          style="auto-size:none"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="userComm">
        </el-input>
        <el-button @click="addComment">添加评论</el-button>
        <el-col class="commentTxt" v-for="o in commentText">
          <el-card shadow="never">
            <h4>{{o.accountName}}</h4>
            <p>{{o.userComment}}</p>
          </el-card>
        </el-col>
      </el-col>
    </el-row>

    <br/>
  </div>
</template>

<script>
  import RecipeFoodTable from './RecipeFoodTable'
  import RecipeStep from './RecipeStep'
  import {collectionLS} from '../../assets/js/collectionLocalStorage.js'

  export default {
    name: "RecipeDetail",
    components: {
      'recipe-food-table': RecipeFoodTable,
      'recipe-step': RecipeStep
    },
    data() {
      return {
        // 用户Id
        userId: '',
        //菜谱详情表内数据
        detailsId: '',
        recipeName: '',
        recipeBrief: '',
        recipeAuthor: '',
        recipePraiseNum: '',
        recipeCoverImg: '',
        //食材表
        f_detailsId: '',
        foodId: '',
        foodNum: '',
        //调料表
        a_detailsId: '',
        accessoriesId: '',
        accessoriesName: '',
        accessoriesNum: '',
        //步骤表内数据
        s_detailsId: '',
        recipeStepId: [],
        id: [],
        recipeStepBrief: [],
        recipeStepImg: [],
        //路由传参获取的id
        p_recipeId: this.$route.params.detailsId,
        //输入评论部分
        userComm: "",
        //显示评论内容
        commentText: [],
      }
    },
    created() {
      // 获取用户Id
      this.userId = localStorage.getItem('userId');
      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/details/` + this.p_recipeId)
        .then((res) => {
          var allData = res.data.data;
          var recipeDetail = allData[0];
          this.detailsId = recipeDetail[0].detailsId;
          this.recipeName = recipeDetail[0].recipeName;
          this.recipeBrief = recipeDetail[0].recipeBrief;
          this.recipeAuthor = recipeDetail[0].recipeAuthor;
          this.recipePraiseNum = recipeDetail[0].recipePraiseNum;
          this.recipeCoverImg = recipeDetail[0].recipeCoverImg;
        })
        .catch(function (err) {
          console.log(err)
        });

    },
    mounted() {
      //根据id获取评论内容
      this.$axios.post(`${$LH.url}/comment/showConmment`, {
        menu_Id: this.p_recipeId
      })
        .then((res) => {
          this.commentText = res.data.data;
        })
        .catch(function (err) {
          console.log(err)
        });
      // 获取存储
      let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
      let userId = this.userId;
      // detailsIdsArray存在的情况下
      if (detailsIdsArray) {
        for (let i = 0; i < detailsIdsArray.length; i++) {
          if (detailsIdsArray[i].userId === userId) {
            for (let j = 0; j < detailsIdsArray[i].collect.length; j++) {
              console.log(detailsIdsArray[i].collect[j] === this.p_recipeId);
              if (detailsIdsArray[i].collect[j] === this.p_recipeId) {
                $("#addColBtn span").text("已收藏");
              }
            }
          }
        }
      }
    },
    methods: {
      //添加评论
      addComment() {
        if (this.$store.state.user.state) {
          this.$axios.post(`${$LH.url}/comment/addComment`, {
            userId: this.$store.state.user.userId,
            userComment: this.userComm,
            detailsId: this.p_recipeId
          })
            .then((res) => {
              if (res.data.data) {
                this.$axios.post(`${$LH.url}/comment/showConmment`, {
                  menu_Id: this.p_recipeId
                })
                  .then((res) => {
                    this.commentText = res.data.data;
                  })
                  .catch(function (err) {
                    console.log(err)
                  });
              }
            })
            .catch(function (err) {
              console.log(err)
            });
        } else {
          this.$router.push('/login');
        }

      },
      //加入收藏 + 取消收藏
      addCollection() {
        // 登录状态
        if (localStorage.getItem("Flag") === 'isLogin') {
          // 获取Id
          let userId = this.userId;
          // 获取存储 -- 存在 / 不存在
          let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
          // 加入收藏
          if ($("#addColBtn span").text() === '收藏') {
            // 一开始就有保存其他人的 === 存在
            if (detailsIdsArray != null) {
              for (let i = 0; i < detailsIdsArray.length; i++) {
                if (detailsIdsArray[i].userId === userId) {
                  detailsIdsArray[i].collect.push(this.p_recipeId);
                } else {
                  detailsIdsArray.push({userId, collect: [this.p_recipeId]});
                }
              }
            } else {
              //  ==== 不存在
              let newArray = [];
              newArray.push({userId, collect: [this.p_recipeId]});
              $("#addColBtn span").text("已收藏");
              this.$notify({
                title: '成功',
                message: '收藏宝典成功!d=====(￣▽￣*)b',
                type: 'success'
              });
              localStorage.setItem('detailsIds', JSON.stringify(newArray));
              return;
            }
            $("#addColBtn span").text("已收藏");
            this.$notify({
              title: '成功',
              message: '收藏宝典成功!d=====(￣▽￣*)b',
              type: 'success'
            });
          } else {
            //  取消收藏 ---- 收藏过的情况下 detailsIdsArray存在的情况下
            for (let i = 0; i < detailsIdsArray.length; i++) {
              if (detailsIdsArray[i].userId === userId) {
                for(let j = 0; j < detailsIdsArray[i].collect.length; j++) {
                  if (detailsIdsArray[i].collect[j] === this.p_recipeId) {
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
                      detailsIdsArray[i].collect.splice(j,1);
                      $("#addColBtn span").text('收藏');
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
          localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
        } else {
          // 未登录状态
          this.$alert('亲,你还未登录哦!赶快加入我们吧!( •̀ ω •́ )✧', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/login');
            }
          });
        }
      },
    }
  }
</script>

<style scoped>
  img {
    /*width: 500px;*/
    height: 400px;
  }

  #container {
    /*background-color: #fdf6dc;*/
  }

  span {
    font-size: 16px;
  }

  .el-header, .el-footer, .comment {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .row-bg {
    /*background-color: #f9fafc;*/
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .commentTxt {
    line-height: 16px;
    text-align: left;
    margin-bottom: 20px;
  }

</style>
