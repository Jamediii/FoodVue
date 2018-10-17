<template>
  <!--活动显示部分-->
  <div id="recentActivity">
    <el-row class="inner-RA">
      <el-col :span="24">
        <h2>近期活动</h2>
        <p>这里可能有你意想不到的活动哦</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :push=1 v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <router-link to="/activity">
            <img src="../../assets/popRecipeIcon.png" class="image">
            <div style="padding: 14px;">
              <span>活动名称</span>
              <div class="bottom clearfix">
                <p>截止时间</p>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "RecentActivities"
  }
</script>

<style scoped>
  #recentActivity {
    margin-top: 20px;
    position: relative;
    height: 400px;
    background-color: #fdf6dc;
  }

  #recentActivity .inner-RA h2, #recentActivity .inner-RA p {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }

  #recentActivity .inner-RA h2 {
    font-size: 40px;
  }

</style>
