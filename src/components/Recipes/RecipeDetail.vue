<template>
  <!--菜谱详情-->
  <div id="container" class="w" >
    <p style="color: transparent">111</p>
    <el-row :gutter="20" >
      <el-col :span="18" >
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
  import {collectionLS} from '../../assets/collectionLocalStorage.js'

  export default {
    name: "RecipeDetail",
    components: {
      'recipe-food-table': RecipeFoodTable,
      'recipe-step': RecipeStep
    },
    data() {
      return {
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
    },
    methods: {
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
  .commentTxt{
    line-height: 16px;
    text-align: left;
    margin-bottom: 20px;
  }

</style>
