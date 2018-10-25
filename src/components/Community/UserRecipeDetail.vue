<template>
  <div id="container" class="w">
    <p style="color: transparent">111</p>
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <el-container>
          <el-header>
              <span style="font-weight: bold;font-size: 25px">
                {{dietTitle}}
                <span>--by{{accountName}}</span>
              </span>
          </el-header>
          <el-main>
            <img :src=dietPhoto>
          </el-main>
          <el-footer>
            <el-col :span="20">
                  <span style="-ms-text-overflow: ellipsis">
                    {{dietIntroduce}}
                  </span>
            </el-col>
            <el-col :span="2">
              <el-button id="addColBtn" @click="addCollection"  type="danger">收藏</el-button>
            </el-col>
          </el-footer>
        </el-container>
        <user-recipe-food-table></user-recipe-food-table>
        <user-recipe-step></user-recipe-step>
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
  import UserRecipeFoodTable from './UserRecipeFoodTable'
  import UserRecipeStep from './UserRecipeStep'
  import {collectionLS} from '../../assets/js/collectionLocalStorage.js'
  export default {
    name: "UserRecipeDetail",
    components:{
      'user-recipe-food-table':UserRecipeFoodTable,
      'user-recipe-step':UserRecipeStep
    },
    data(){
      return{
        //菜谱详情表内数据
        dietId:'',
        dietTitle:'',
        dietIntroduce:'',
        accountName:'',
        dietPhoto:'',
        //路由传参获取的id
        p_dietId:this.$route.params.dietId,
        //输入评论部分
        userComm: "",
        //显示评论内容
        commentText: [],
      }
    },
    created(){
      //根据id获取的菜谱
      this.$axios.get(`${$LH.url}/recipes/users/details/` + this.p_dietId)
        .then((res) =>{
          var allData = res.data.data;
          var dietDetail = allData[0];
          this.dietId = dietDetail[0].dietId;
          this.dietTitle = dietDetail[0].dietTitle;
          this.dietIntroduce = dietDetail[0].dietIntroduce;
          this.accountName = dietDetail[0].accountName;
          this.dietPhoto = dietDetail[0].dietPhoto;

          console.log(this.p_dietId)

        })
        .catch(function (err) {
          console.log(err)
        });
    },
    mounted(){
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
    },
    methods:{
      //添加评论
      addComment() {
        if(this.$store.state.user.state){
          this.$axios.post(`${$LH.url}/comment/addComment`, {
            userId: this.$store.state.user.userId,
            userComment: this.userComm,
            detailsId: this.p_recipeId
          })
            .then((res) => {
              if(res.data.data){
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
        }else{
          this.$router.push('/login');
        }

      },
      //加入收藏
      addCollection(){
        if(this.$store.state.user.state){
          $("#addColBtn span").text("已收藏");
          collectionLS.collection(this.p_recipeId);
        }else{
          this.$router.push('/login');
        }
      }
    }

  }
</script>

<style scoped>
  img{
    /*width: 500px;*/
    height: 400px;
  }
  #container{
    background-color: #fdf6dc;
  }
  span{
    font-size: 16px;
  }

  .el-header, .el-footer {
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
    background-color: #f9fafc;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

</style>

