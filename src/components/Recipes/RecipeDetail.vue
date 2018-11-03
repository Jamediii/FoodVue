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
            <el-col :span="7">
              <i class="el-icon-star-on" style="color: #8cccc1;"></i> 点赞{{recipePraiseNum}}人
              <i class="el-icon-edit-outline" style="color: #8cccc1;padding-left: 20px"></i> 留言{{commentNum}}条
            </el-col>
            <el-col :span="7" :offset="10">
              <button class="collection" @click="addCollection">收藏</button>
              <div class="demo">
                <img v-for="o in hert" :src="`../../../static/images/${(o % 3 )+ 1}.png`" alt="">
              </div>
              <button class="thumbsUp" style="position: absolute;bottom: 0;right:25px;" @click="addThumbsUp">点赞</button>
            </el-col>
          </el-row>
          <div>
          </div>
          <br/>

          <div class="author">
            <img :src=headPhoto class="headPhoto">
            <span style="color: #8cccc1">{{recipeAuthor}}</span>
            <button class="followUser" @click="followUser">关注</button>
            <p style="font-size: 16px;color: #666;"><br/>{{recipeBrief}}</p>
          </div>
          <recipe-food-table></recipe-food-table>
          <recipe-step></recipe-step>
        </el-main>
      </el-col>
      <el-col :span="8" class="hidden-xs-only hidden-sm-only hidden-md-only" :lg="8" :xl="8">
        <recommend></recommend>
        <el-col>
          <div id="toTop">
            <i class="el-icon-caret-top" @click="toTop"></i>
          </div>
        </el-col>
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
            <el-col :span="2" style="margin-right: 10px;">
              <img :src="o.headPhoto" alt="">
            </el-col>
            <el-col :span="20">
              <span>{{o.accountName}}   {{o.commentTime}}&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-delete"
                                                                                    v-if="o.userId == userId"
                                                                                    @click="delComm(o)"></i></span>
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
  //回到顶部
  $(function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() < 400) {
        $("#toTop").css({"display": "none"})
      } else {
        $("#toTop").css({"display": "block"})
      }
      $("#toTop").offset({"top": $(window).scrollTop() + 600})
    })
  });
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
        hert: 1,
        // everyPraiseNum: 0,
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
        p_recipeId: parseInt(this.$route.params.detailsId),
        //输入评论部分
        userComm: "",
        //显示评论内容
        commentText: [],
        commentTime: null,
        commentId: [],
        //显示评论数量
        commentNum: 0,
        //显示删除
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

      //获取评论的条数
      this.$axios.post(`${$LH.url}/comment`, {
        menu_Id: this.p_recipeId
      })
        .then((res) => {
          this.commentNum = res.data.data[0].commentNum;
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
      // 回到顶部
      toTop() {
        $(document).scrollTop(0)
      },
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
                this.userComm = "";
                if (res.data.data) {
                  this.$axios.post(`${$LH.url}/comment/showConmment`, {
                    menu_Id: this.p_recipeId
                  })
                    .then((res) => {
                      this.commentNum++;
                      this.commentText = res.data.data;
                      var len = res.data.data.length;
                      for (let i = 0; i < len; i++) {
                        //将评论ID放入数组
                        this.commentId.push(res.data.data[i].commentId);
                      }
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

      //删除评论
      delComm(obj) {
        if (obj.userId == localStorage.getItem("userId")) {
          this.$confirm('你真的要删除这条评论吗?(。_。)', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post(`${$LH.url}/comment/delComment`, {
              commentId: obj.commentId
            }).then((res) => {
              this.reload();
            }).catch((err) => {
              console.log(err);
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
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
            let isUser = false; // 假设是没有这个用户的
            let Id = '';
            // 一开始就有保存其他人的 === 存在
            if (detailsIdsArray != null) {
              // 判断是否存在该用户
              for (let i = 0; i < detailsIdsArray.length; i++) {
                if (detailsIdsArray[i].userId === userId) {
                  isUser = true;
                  Id = i;
                }
              }
              if (isUser) {
                if (detailsIdsArray[Id].collect != null) {
                  detailsIdsArray[Id].collect.push(this.p_recipeId);
                  localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                } else {
                  detailsIdsArray[Id].collect = [];
                  detailsIdsArray[Id].collect.push(this.p_recipeId);
                  localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                }
              } else {
                detailsIdsArray.push({userId, collect: [this.p_recipeId]});
                localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
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
            }
          } else {
            //  取消收藏 ---- 收藏过的情况下 detailsIdsArray存在的情况下
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
              for (let i = 0; i < detailsIdsArray.length; i++) {
                if (detailsIdsArray[i].userId === userId) {
                  for (let j = 0; j < detailsIdsArray[i].collect.length; j++) {
                    console.log(detailsIdsArray[i].collect[j] === this.p_recipeId);
                    if (detailsIdsArray[i].collect[j] === this.p_recipeId) {
                      detailsIdsArray[i].collect.splice(j, 1);
                      $(".collection").text('收藏');
                      localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                      return;
                    }
                  }
                }
              }
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
            callback: () => {
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
        //点赞特效
        var x = 100;
        var y = 900;
        var num = Math.floor(Math.random() * 3 + 1);
        var index = $('.demo').children('img').length;
        var rand = parseInt(Math.random() * (x - y + 1) + y);
        $(".demo>img").animate({
          bottom: "800px",
          opacity: "0",
          left: rand,
        }, 3000);

        //每天每个菜谱只能点5次
        if (localStorage.getItem("Flag") === 'isLogin') {
          // var date = new Date();
          // let year = date.getFullYear();
          // let month = date.getMonth();
          // let day = date.getDate();
          // let startday = Date.parse(new Date(`${year}-${month + 1}-${day} 00:00:00`));
          // let endday = Date.parse(new Date(`${year}-${month + 1}-${day} 24:00:00`));
          // var differday = endday - startday;
          //存入cookie
          // var exp = new Date();
          // exp.setTime(exp.getTime() + differday);//设置过期时间
          // let pointPrise = [];
          // let recipeId =this.p_recipeId;
          // let everyPraiseNum = 0;
          // everyPraiseNum++;
          // pointPrise.push({detailsId: recipeId, everyPraiseNum: everyPraiseNum});
          // document.cookie = name + "=" + JSON.stringify(pointPrise) + ";expires=" + exp.toGMTString();

          //如果cookie存在，并且点赞数小于5，可以继续点赞
          // if (everyPraiseNum < 5) {
          //控制小心心的
          this.hert++;
          // everyPraiseNum++;
          this.$axios.post(`${$LH.url}/praiseNum`, {
            detailsId: this.p_recipeId,
          })
            .then((res) => {
              if (res.data.data) {
                this.recipePraiseNum++;
              }
            }).catch(err => {
            console.log(err);
          });
          // } else {
          //   //否则不能点赞
          //   this.$message({
          //     message: '一天最多能点5次哦',
          //     type: 'warning'
          //   });
          // }

        } else {
          // 未登录状态
          this.$alert('亲,你还未登录哦!赶快加入我们吧!( •̀ ω •́ )✧', '消息', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.push('/login');
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  div{
    font-size: 16px;
  }
  #toTop{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #8cccc1;
    cursor: pointer;
    color: #8cccc1;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }

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
    bottom: 100px;
    font-size: 16px;
  }

  .author {
    width: 100%;
    height: auto;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 10px;
  }

  img {
    width: 100%;
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
    color: #333;
    text-align: left;
    border: 1px solid gainsboro;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
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

  .commentTxt img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .commentTxt .commentInner {
    margin-top: 16px;
  }

  .commentTxt .commentInner .el-col {
    box-sizing: border-box;
    /*padding-top: 10px;*/
  }

  .commentTxt .commentInner .el-col span {
    font-size: 14px;
    color: #4a4c4a;
    margin-top: 10px;
  }

  .commentTxt .commentInner p {
    margin-top: 16px;
    font-size: 20px;
  }

  .commentTxt .commentInner .el-icon-delete:hover {
    cursor: pointer;
  }

  /*点赞特效*/

  .demo {
    position: absolute;
    bottom: 2px;
    left: 92%;
  }

  #container .demo > img {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 50%;
    left: 50%;
    margin-left: -10px;
  }
</style>
