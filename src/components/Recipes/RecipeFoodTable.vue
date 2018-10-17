<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="食材表 " width="180"></el-table-column>
      <el-table-column prop="weight" label=" " width=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "RecipeFood",
      data() {
        return {
          tableData: [
            {
              name: '土豆',
              weight: '生重500-600克'
            },
            {
              name: '原味无糖酸奶',
              weight: '120g'
            },
            {
              name: '白洋葱',
              weight: '中等大小的1/8个'
            }
          ]
        }
      }
    }
</script>

<style scoped>
  div{
    padding: 20px;
    background: white;
  }

</style>
