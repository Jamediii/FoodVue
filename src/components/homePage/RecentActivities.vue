<template>
  <!--活动显示部分-->
  <div id="recentActivity">
    <div class="w">
      <el-row class="inner-RA">
        <el-col :span="24">
          <!--<h2>近期活动</h2>-->
          <el-header>>>&nbsp;&nbsp;近期活动</el-header>
          <!--<p>这里可能有你意想不到的活动哦</p>-->
        </el-col>
      </el-row>
      <el-row class="activity" :gutter="20">
        <el-col :span="6" v-for="(o, index) in recentAct" :key="index" v-if="index < 4">
          <el-card :body-style="{ padding: '0px' }">

            <img :src="o.activityImg" class="image">
            <div style="padding: 14px;">
              <router-link :to="`/activity/${o.activityId}`">
                <span>{{o.activityName}}</span>
              </router-link>
              <div class="bottom clearfix">
                <p>{{o.activityState}}</p>
              </div>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "RecentActivities",
    data() {
      return {
        recentAct: [],
      }
    },
    mounted() {
      this.$axios.get(`${$LH.url}/competition`).then((res) => {
        this.recentAct = res.data.data;
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  #recentActivity {
    padding-top: 20px;
    margin-top: 20px;
    position: relative;
    height: 460px;
    background-color: #fff;
  }

  #recentActivity .inner-RA h2, #recentActivity .inner-RA p {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }

  #recentActivity .inner-RA h2 {
    font-size: 40px;
  }

  #recentActivity .activity img {
    height: 240px;
    width: 100%;
  }
  #recentActivity .el-header {
    background-color: #8cccc1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    color:#fff;
    margin-bottom: 20px;
  }

</style>
