<template>
  <el-container>
    <el-header>享食社区文章作者&nbsp;&nbsp;>></el-header>
    <el-main>
      <ul>
        <li>
          <div class="name_pic">
            <img src="https://assets-blog.icook.network/assets/authors/editor-291058ee055030d3f79047260563ab3c2a1b89dce78e14b8af64a4906404cc45.jpg"><br/>
            <router-link to="/community_author"><span>爱料理编辑部</span></router-link>
          </div>
        </li>
        <li>
          <div class="name_pic">
            <img src="https://assets-blog.icook.network/assets/authors/editor-291058ee055030d3f79047260563ab3c2a1b89dce78e14b8af64a4906404cc45.jpg"><br/>
            <router-link to="/community_author"><span>爱料理编辑部</span></router-link>
          </div>
        </li>
        <li>
          <div class="name_pic">
            <img src="https://assets-blog.icook.network/assets/authors/editor-291058ee055030d3f79047260563ab3c2a1b89dce78e14b8af64a4906404cc45.jpg"><br/>
            <router-link to="/community_author"><span>爱料理编辑部</span></router-link>
          </div>
        </li>
        <li>
          <div class="name_pic">
            <img src="https://assets-blog.icook.network/assets/authors/editor-291058ee055030d3f79047260563ab3c2a1b89dce78e14b8af64a4906404cc45.jpg"><br/>
            <router-link to="/community_author"><span>爱料理编辑部</span></router-link>
          </div>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "AuthorList",
      components:{

      }
    }
</script>

<style scoped>
  img{
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .name_pic{
    display: inline-block;
  }
  span{
    font-size: 6px;
  }
  ul{
    list-style: none;
  }
  li{
    float: left;
    width: 82px;
  }

  .el-header{
    background-color: #fae8c8;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
  }

</style>
