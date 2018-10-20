<template>
    <div class="author_brief">
      <el-container>
        <el-main>
          <div class="name_pic">
            <!--<img src="https://assets-blog.icook.network/assets/authors/editor-291058ee055030d3f79047260563ab3c2a1b89dce78e14b8af64a4906404cc45.jpg"><br/>-->
            <img :src=authorImg alt=""><br/><br/>
            <span>
              {{authorName}}
              <!--爱料理编辑部-->
            </span>
          </div>
          <br/>
          <p>
            {{authorBrief}}
            <!--由爱料理编辑撰文，或向爱料理生活志客座投稿，严选各类与「食」相关的文章议题，内容包罗万象，-->
            <!--如欲投稿欢迎来信至 hi@icook.tw-->
          </p>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  export default {
      name: "ArticleAuthor",
      data(){
        return{
          authorName:'',
          authorBrief:'',
          authorImg:''
        }
      },
      mounted(){
        this.$axios.get('//localhost:3000/community/author/details/1')
          .then((res)=>{
            var authorBrief = res.data.data;
            console.log(authorBrief);
            this.authorName = authorBrief[0].authorName;
            this.authorBrief = authorBrief[0].authorBrief;
            this.authorImg = authorBrief[0].authorImg;
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
</script>

<style scoped>
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }
  img{
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
</style>
