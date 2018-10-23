<template>
  <!--活动显示部分-->
  <div id="recentActivity">
    <div class="w">
      <el-row class="inner-RA">
        <el-col :span="24">
          <h2>近期活动</h2>
          <p>这里可能有你意想不到的活动哦</p>
        </el-col>
      </el-row>
      <el-row class="activity" :gutter="20">
        <el-col :span="6" :push="5" v-for="(o, index) in recentAct" :key="index" v-if="index < 2" :offset="index > 0 ? 3 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <router-link :to="`/activity/${o.activityId}`">
              <img :src="o.activityImg" class="image">
              <div style="padding: 14px;">
                <span>{{o.activityName}}</span>
                <div class="bottom clearfix">
                  <p>{{o.activityState}}</p>
                </div>
              </div>
            </router-link>
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
        recentAct:[],
      }
    },
    mounted() {
      this.$axios.get("http://localhost:3000/competition").then((res) => {
        this.recentAct = res.data.data;
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  #recentActivity {
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

  #recentActivity .activity img{
    height: 200px;
    width: 100%;
  }

</style>
