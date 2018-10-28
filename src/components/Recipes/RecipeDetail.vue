<template>
  <!--菜谱详情-->
  <div id="container" class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="30">
      <el-col :span="16">
        <el-main>
          <img :src="recipeCoverImg">
          <h2 style="font-weight: bold">{{recipeName}}</h2><br/>
          <el-row style="height: 30px;line-height: 30px">
            <el-col :span="6">
              <i class="el-icon-star-on" style="color: #8cccc1;"></i> 收藏221人
              <i class="el-icon-edit-outline" style="color: #8cccc1;padding-left: 20px"></i> 留言24条
            </el-col>
            <el-col :span="6" :offset="12">
              <button class="collection" @click="addCollection">收藏</button>
              <button class="thumbsUp" @click="addThumbsUp">点赞{{thumbsUp}}</button>
            </el-col>
          </el-row>
          <div>
          </div>
          <br/>

          <div class="author">
            <img :src=headPhoto class="headPhoto">
            <span style="color: #8cccc1">{{recipeAuthor}}</span>
            <button class="followUser" @click="followUser">关注</button>
            <p style="font-size: 13px;color: #666;"><br/>{{recipeBrief}}</p>
          </div>
          <recipe-food-table></recipe-food-table>
          <recipe-step></recipe-step>
        </el-main>
      </el-col>
      <el-col :span="8">
        <recommend></recommend>
      </el-col>
    </el-row>

    <!--评论部分-->
    <el-row :gutter="20">
      <el-col class="comment" :span="16">
        <p>评论专区</p>
        <el-input
          type="textarea"
          style="margin-bottom:20px;"
          rows="3"
          resize="none"
          placeholder="请输留下你的评论哟d=====(￣▽￣*)b"
          v-model="userComm">
        </el-input>
        <button @click="addComment">添加评论</button>
        <el-col class="commentTxt" v-for="o in commentText">
          <!--<el-card shadow="never">-->
          <div class="commentInner">
            <el-col :span="2">
              <img :src="o.headPhoto" alt="">
            </el-col>
            <el-col :span="20">
              <span>{{o.accountName}}   {{o.commentTime}} </span>
              <p>{{o.userComment}}</p>
            </el-col>
          </div>
          <!--</el-card>-->
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
  import Recommend from '../Community/Recommend.vue'

  export default {
    //注入
    inject: ['reload'],
    name: "RecipeDetail",
    components: {
      'recipe-food-table': RecipeFoodTable,
      'recipe-step': RecipeStep,
      'recommend': Recommend
    },
    data() {
      return {
        // 用户Id
        userId: localStorage.getItem('userId'),
        //达人 Id
        fansId: '',
        // 点赞数
        thumbsUp: '',
        //菜谱详情表内数据
        detailsId: '',
        recipeName: '',
        recipeBrief: '',
        recipeAuthor: '',
        recipePraiseNum: '',
        recipeCoverImg: '',
        headPhoto: '',
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
        commentTime:null,
      }
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

      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/details/` + this.p_recipeId)
        .then((res) => {
          var allData = res.data.data;
          var recipeDetail = allData[0];
          this.fansId = recipeDetail[0].userId;
          this.detailsId = recipeDetail[0].detailsId;
          this.recipeName = recipeDetail[0].recipeName;
          this.recipeBrief = recipeDetail[0].recipeBrief;
          this.recipeAuthor = recipeDetail[0].accountName;
          this.recipePraiseNum = recipeDetail[0].recipePraiseNum;
          this.recipeCoverImg = recipeDetail[0].recipeCoverImg;
          this.headPhoto = recipeDetail[0].headPhoto;

          // 获取存储 是否收藏过该菜谱
          let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
          let userId = this.userId;
          // detailsIdsArray存在的情况下
          if (detailsIdsArray) {
            for (let i = 0; i < detailsIdsArray.length; i++) {
              if (detailsIdsArray[i].userId === userId) {
                for (let j = 0; j < detailsIdsArray[i].collect.length; j++) {
                  if (detailsIdsArray[i].collect[j] === this.p_recipeId) {
                    $(".collection").text("已收藏");
                  }
                }
              }
            }
          }

          // 用户是否关注过他
          this.$axios.get(`${$LH.url}/users/queryFans/${this.userId}/${this.fansId}`)
            .then(isFans => {
              console.log(isFans.data.data);
              if (isFans.data.data.length > 0) {
                $('.followUser').text('已关注')
              }
            })
            .catch(err => {
              console.log(err);
            });

        });
    },
    watch: {
      '$route': function (to, from) {
        this.reload();
      },
    },
    methods: {

      //添加评论
      addComment() {
        this.commentTime = new Date().toLocaleString();
        if (this.userComm.length) {
          if (localStorage.getItem("Flag") === "isLogin") {
            this.$axios.post(`${$LH.url}/comment/addComment`, {
              userId: localStorage.getItem("userId"),
              userComment: this.userComm,
              detailsId: this.p_recipeId,
              commentTime: this.commentTime,
            })
              .then((res) => {
                this.userComm="";
                if (res.data.data) {
                  this.$axios.post(`${$LH.url}/comment/showConmment`, {
                    menu_Id: this.p_recipeId
                  })
                    .then((res) => {
                      this.commentText = res.data.data;
                      console.log(this.commentText);
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
        } else {
          this.$message('评论不能为空哟d=====(￣▽￣*)b');
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
          if ($(".collection").text() === '收藏') {
            // 一开始就有保存其他人的 === 存在
            if (detailsIdsArray != null) {
              for (let i = 0; i < detailsIdsArray.length; i++) {
                if (detailsIdsArray[i].userId === userId) {
                  if (detailsIdsArray[i].collect != null) {
                    detailsIdsArray[i].collect.push(this.p_recipeId);
                    localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                  } else {
                    detailsIdsArray[i].collect = [];
                    detailsIdsArray[i].collect.push(this.p_recipeId);
                    localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                  }
                } else {
                  detailsIdsArray.push({userId, collect: [this.p_recipeId]});
                  localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                }
              }
              $(".collection").text("已收藏");
              this.$notify({
                title: '成功',
                message: '收藏宝典成功!d=====(￣▽￣*)b',
                type: 'success'
              });
            } else {
              //  ==== 不存在
              let newArray = [];
              newArray.push({userId, collect: [this.p_recipeId]});
              $(".collection").text("已收藏");
              this.$notify({
                title: '成功',
                message: '收藏宝典成功!d=====(￣▽￣*)b',
                type: 'success'
              });
              localStorage.setItem('detailsIds', JSON.stringify(newArray));
              return;
            }
          } else {
            //  取消收藏 ---- 收藏过的情况下 detailsIdsArray存在的情况下
            for (let i = 0; i < detailsIdsArray.length; i++) {
              if (detailsIdsArray[i].userId === userId) {
                for (let j = 0; j < detailsIdsArray[i].collect.length; j++) {
                  console.log(detailsIdsArray[i].collect[j] === this.p_recipeId);
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
                      detailsIdsArray[i].collect.splice(j, 1);
                      $(".collection").text('收藏');
                      localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                      return;
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
      // 关注 + 取关
      followUser() {
        if (localStorage.getItem("Flag") === 'isLogin') {
          if ($('.followUser').text() === '关注') {
            this.$axios.get(`${$LH.url}/users/joinFans/${this.userId}/${this.fansId}`)
              .then(() => {
                this.$message({
                  message: '感谢您的关注!',
                  type: 'success'
                });
                $('.followUser').text('已关注');
              }).catch(err => {
              console.log(err);
            });
          } else {
            // 取消关注
            this.$confirm('您老确定要这样子做吗?(。_。)', '取消收藏', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.get(`${$LH.url}/users/abolishFans/${this.userId}/${this.fansId}`)
                .then(() => {
                  this.$message({
                    message: '感谢您之前一直以来的陪伴!',
                    type: 'success'
                  });
                  $(".followUser").text('关注');
                }).catch(err => {
                console.log(err);
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消操作'
              });
            });
          }
        } else {
          // 未登录状态
          this.$alert('亲,你还未登录哦!赶快加入我们吧!( •̀ ω •́ )✧', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/login');
            }
          })
        }
      },

      // 点赞 + 取消点赞
      addThumbsUp() {
        this.$message({
          message: '感谢您的使用,该功能我们已经在紧急加入了',
          type: 'success'
        });
        // this.$axios({
        //   methods: 'post',
        //   url: `${$LH.url}/praiseNum`,
        //   data: {
        //     detailsId: this.detailsId
        //   }
        // });
      }
    }
  }
</script>

<style scoped>

  button {
    width: 80px;
    height: 30px;
    border-radius: 4px;
    background-color: #8cccc1;
    /*background-color: #999999;*/
    color: white;
    text-align: center;
    border: none;
    text-decoration: none;
  }

  .author {
    width: 100%;
    height: 100px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 10px;
  }

  img {
    width: 100%;
    /*height: 400px;*/
  }

  .headPhoto {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  #container {
    background-color: white;
  }

  span {
    font-size: 16px;
  }

  .el-main {
    /*background-color: white;*/
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
    /*padding: 0px;*/
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
    border-bottom: 1px dashed #8cccc1;
  }

  .commentTxt img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .commentTxt .commentInner{
    margin-top:16px;

  }
  .commentTxt .commentInner .el-col{
    box-sizing: border-box;
    /*padding-top: 10px;*/
  }
  .commentTxt .commentInner .el-col span{
    margin-top: 10px;
  }
  .commentTxt .commentInner p{
    margin-top: 16px;
  }

</style>
