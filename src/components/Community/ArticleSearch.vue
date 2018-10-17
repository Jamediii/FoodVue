<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="input" placeholder="搜索文章" suffix-icon="el-icon-search"></el-input>
    </el-row>
 </div>

</template>

<script>
    export default {
        name: "ArticleSearch",
      data() {
        return {
          input: ''
        }
      }
    }
</script>

<style scoped>


</style>
