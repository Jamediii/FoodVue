<template>
    <div>
      <br/>
      <el-row :gutter="30">
        <el-col :span="11" :offset="5">
          <el-container>
            <el-header>
              <div class="triangle"></div>
              这样的摆盘，沙拉更美味了！沙拉装饰技巧跟着做
              <hr/>
            </el-header>
            <el-main>
              <span>
                <div class="rectangle"></div>
                <router-link to="/community_author">&nbsp;爱料理 编辑部 发表于 2018/10/13</router-link>
              </span><br/>
              改变沙拉摆盘的方式可以让做好的沙拉显得更可口诱人。沙拉与酱料拌匀后并不是放在盘子上就大功告成，而是应该要像描绘一幅画般将食材摆入盘中，
              如此一来不仅赏心悦目，也為餐桌增色不少。<br/><br/>
              以下将以「鸡肉沙拉」為范例，介绍堆高式与平铺式的摆盘法，以及堆高式摆盘的分食方法。<br/><br/>
              在為沙拉摆盘以及分食时都可以参考以下方法。<br/><br/>
              <span style="color: red;font-weight: bold">堆高式摆盘</span><br/><br/>
              1.把作為基底的叶菜类蔬菜放在器皿中央，堆成小山状。<br/><br/>
              <img src="https://storage.googleapis.com/uploads-blog-icook/2018/09/bf143e37-76-1-800x533.jpg"><br/><br/>
              2.把主菜的鸡肉斜立在蔬菜四周。<br/><br/>
              <img src="https://storage.googleapis.com/uploads-blog-icook/2018/09/bc63f0f6-76-2-800x533.jpg"><br/><br/>
              3.把增添色彩的豌豆荚放在鸡肉与鸡肉之间。<br/><br/>
              <img src="https://storage.googleapis.com/uploads-blog-icook/2018/09/39e82811-76-3-800x533.jpg"><br/><br/>
              4.剩下的叶菜类蔬菜集中在中间，往上堆高。堆叠时可用手与筷子支撑辅助。<br/><br/>
              <img src="https://storage.googleapis.com/uploads-blog-icook/2018/09/699900a6-76-4-800x533.jpg"><br/><br/>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="4">
          <article-search></article-search><br/>
          <author-list></author-list>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import ArticleSearch from './ArticleSearch.vue'
  import AuthorList from './AuthorList.vue'

  export default {
        name: "ArticleDetail",
      components:{
        'article-search':ArticleSearch,
        'author-list':AuthorList
      }
    }
</script>

<style scoped>
  div{
    background-color: #fdf6dc;
  }
  .el-header {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 20px;
    border-bottom:1px solid gainsboro;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
  }

  .triangle {
    height: 0;
    width: 0;
    border-right: 6px solid white;
    border-bottom: 6px solid white;
    border-top: 6px solid white;
    border-left: 6px solid red;
    /*border: 6px solid red;*/
    display: inline-block;
  }

  .rectangle{
    height: 12px;
    width: 5px;
    background: red;
    display: inline-block;
  }
</style>
