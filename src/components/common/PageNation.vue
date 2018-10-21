<template>
  <!--分页组件-->
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="5">
        <!--分页-->
        <div class="block">
          <el-pagination
            @current-change="currentPageNum" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="len">
          </el-pagination>
        </div>
        <!--current-change当前页变动时候触发的事件-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PageNation",
    data() {
      return {
        // 分页
        articleInfoList: [],//每页显示的数据
        articleList: [],//所有的数据
        currentPage: 1,//当前页
        len: 0,//默认总的数据长度
        pageSize: 5,//默认每页显示的数量
      }
    },
    props:['aldata'],
    methods: {
      handleInfo() {
        this.articleList =this.aldata.data;
        this.len=this.aldata.data.length;
        // 页数，如果有小数，只取整数部分
        let pageNum = Number(String(this.len / this.pageSize).split(".")[0]);
        // 定义一个空数组
        let newArr = [];
        // 遍历获取的数据，每次遍历都从数组的0位置开始截取，截取数量为每页显示的数量
        for (let i = 0; i < pageNum; i++) {
          newArr.push(this.articleList.splice(0, this.pageSize));
        }
        // 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩余的数据放进newArr数组
        if (this.articleList.length < this.pageSize) {
          newArr.push(this.articleList.splice(0, this.articleList.length));
        }
        // 将新的数组赋给articleList[],用来渲染页面
        this.articleList = newArr;
        // 第一次进入页面显示this.articleList[]数组的第一个元素
        this.articleInfoList = this.articleList[0]
        console.log(this.articleList[0])
      },
      currentPageNum(currentPage) {
        this.articleList =this.aldata.data.data;
        // currentPage为当前的页数
        // 显示当前页数对应的数据
        this.articleInfoList = this.articleList[currentPage - 1];
      },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      // }
    }
  }
</script>

<style scoped>

</style>
