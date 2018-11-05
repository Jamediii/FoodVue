<template>
  <div id="container" class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="30">
      <el-col :span="16" :xs="24" :sm="24" :md="22" :lg="16" :xl="16">
        <el-main>
          <img :src=dietPhoto>
          <h2 style="font-weight: bold">{{dietTitle}}</h2><br/>
          <el-row style="height: 30px;line-height: 30px">
            <el-col :span="6">
              <i class="el-icon-star-on" style="color: #8cccc1;"></i> 收藏221人
              <!--<i class="el-icon-edit-outline" style="color: #8cccc1;padding-left: 20px"></i>-->
            </el-col>
            <el-col :span="2" :offset="15">
              <button @click="addCollection" class="collection">收藏</button>
              <!--<button>点赞</button>-->
            </el-col>
          </el-row>
          <br/>

          <div class="author">
            <img :src=headPhoto class="headPhoto">
            <span style="color: #8cccc1">{{accountName}}</span>
            <button @click="followUser" class="followUser">关注</button>
            <p style="font-size: 13px;color: #666;"><br/>{{dietIntroduce}}</p>
          </div>
          <user-recipe-food-table></user-recipe-food-table>
          <user-recipe-step></user-recipe-step>
        </el-main>
      </el-col>


      <el-col :span="8" class="hidden-xs-only hidden-sm-only hidden-md-only" :lg="8" :xl="8">
        <recommend></recommend>
      </el-col>
    </el-row>

    <!--<el-row>-->
      <!--&lt;!&ndash;评论部分&ndash;&gt;-->
      <!--<el-col class="comment" :span="18" :offset="3">-->
        <!--<p>评论专区</p>-->
        <!--<el-input-->
          <!--type="textarea"-->
          <!--style="auto-size:none"-->
          <!--:autosize="{ minRows: 2, maxRows: 4}"-->
          <!--placeholder="请输入内容"-->
          <!--v-model="userComm">-->
        <!--</el-input>-->
        <!--<el-button @click="addComment">添加评论</el-button>-->
        <!--<el-col class="commentTxt" v-for="o in commentText">-->
          <!--<el-card shadow="never">-->
            <!--<h4>{{o.accountName}}</h4>-->
            <!--<p>{{o.userComment}}</p>-->
          <!--</el-card>-->
        <!--</el-col>-->
      <!--</el-col>-->
    <!--</el-row>-->

    <br/>
  </div>
</template>

<script>
  import UserRecipeFoodTable from './UserRecipeFoodTable'
  import UserRecipeStep from './UserRecipeStep'
  import {collectionLS} from '../../assets/js/collectionLocalStorage.js'
  import Recommend from './Recommend.vue'

  export default {
    name: "UserRecipeDetail",
    components: {
      'user-recipe-food-table': UserRecipeFoodTable,
      'user-recipe-step': UserRecipeStep,
      'recommend': Recommend
    },
    data() {
      return {
        //菜谱详情表内数据
        userId: '',
        dietId: '',
        headPhoto: '',
        dietTitle: '',
        dietIntroduce: '',
        accountName: '',
        dietPhoto: '',
        //路由传参获取的id
        p_dietId: this.$route.params.dietId,
        //输入评论部分
        userComm: "",
        //显示评论内容
        commentText: [],
      }
    },
    created() {
      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/users/details/` + this.p_dietId)
        .then((res) => {
          var allData = res.data.data;
          var dietDetail = allData[0];
          // 用户的Id
          this.userId = dietDetail[0].userId;
          this.dietId = dietDetail[0].dietId;
          this.headPhoto = dietDetail[0].headPhoto;
          this.dietTitle = dietDetail[0].dietTitle;
          this.dietIntroduce = dietDetail[0].dietIntroduce;
          this.accountName = dietDetail[0].accountName;
          this.dietPhoto = dietDetail[0].dietPhoto;

          // 获取存储 是否收藏过该菜谱
          let detailsIdsArray = JSON.parse(localStorage.getItem("detailsIds"));
          let userId = localStorage.getItem('userId');
          // detailsIdsArray存在的情况下
          if (detailsIdsArray) {
            for (let i = 0; i < detailsIdsArray.length; i++) {
              if (detailsIdsArray[i].userId === userId) {
                for (let j = 0; j < detailsIdsArray[i].collectUser.length; j++) {
                  if (detailsIdsArray[i].collectUser[j] === this.dietId) {
                    $(".collection").text("已收藏");
                  }
                }
              }
            }
          }

          // 用户是否关注过他
          this.$axios.get(`${$LH.url}/users/queryFans/${userId}/${this.userId}`)
            .then(isFans => {
              console.log(isFans.data.data);
              if (isFans.data.data.length > 0) {
                $('.followUser').text('已关注')
              }
            })
            .catch(err => {
              console.log(err);
            });

        })
        .catch(function (err) {
          console.log(err)
        });
    },
    mounted() {
      //根据id获取评论内容
      this.$axios.post(`${$LH.url}/comment/showConmment`, {
        menu_Id: this.dietId
      })
        .then((res) => {
          this.commentText = res.data.data;
        })
        .catch(function (err) {
          console.log(err)
        });
    },
    methods: {
      //添加评论
      addComment() {
        if (this.$store.state.user.state) {
          this.$axios.post(`${$LH.url}/comment/addComment`, {
            userId: this.userId,
            userComment: this.userComm,
            detailsId: this.dietId
          })
            .then((res) => {
              if (res.data.data) {
                this.$axios.post(`${$LH.url}/comment/showConmment`, {
                  menu_Id: this.dietId
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
      //加入收藏 / 取消收藏
      addCollection() {
        // 登录状态
        if (localStorage.getItem("Flag") === 'isLogin') {
          if(localStorage.getItem('userId') === this.userId.toString()) {
            this.$message({
              message: '警告! 不可以自己收藏自己的菜谱哦(￣▽￣)"',
              type: 'warning'
            });
            return false;
          }

          // 获取Id
          let userId = localStorage.getItem('userId');
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
                if (detailsIdsArray[Id].collectUser != null) {
                  detailsIdsArray[Id].collectUser.push(this.dietId);
                  localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                } else {
                  detailsIdsArray[Id].collectUser = [];
                  detailsIdsArray[Id].collectUser.push(this.dietId);
                  localStorage.setItem('detailsIds', JSON.stringify(detailsIdsArray));
                }
              } else {
                detailsIdsArray.push({userId, collectUser: [this.dietId]});
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
              console.log(userId);
              console.log(this.dietId);
              newArray.push({userId, collectUser: [this.dietId]});
              console.log(newArray);
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
                  for (let j = 0; j < detailsIdsArray[i].collectUser.length; j++) {
                    console.log(detailsIdsArray[i].collectUser[j] === this.dietId);
                    if (detailsIdsArray[i].collectUser[j] === this.dietId) {
                      detailsIdsArray[i].collectUser.splice(j, 1);
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
            callback: action => {
              this.$router.push('/login');
            }
          });
        }
      },

      // 加关注 / 取关
      // 关注 + 取关
      followUser() {
        if (localStorage.getItem("Flag") === 'isLogin') {
          if(localStorage.getItem('userId') === this.userId.toString()) {
            this.$message({
              message: '警告! 不可以自己关注自己哦(￣▽￣)"',
              type: 'warning'
            });
            return false;
          }
          if ($('.followUser').text() === '关注') {
            this.$axios.get(`${$LH.url}/users/joinFans/${localStorage.getItem('userId')}/${this.userId}`)
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
              this.$axios.get(`${$LH.url}/users/abolishFans/${localStorage.getItem('userId')}/${this.userId}`)
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
    color: white;
    text-align: center;
    border: none;
    text-decoration: none;
  }

  .author {
    width: 100%;
    height:auto;
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
    margin-bottom: 20px;
  }

</style>

