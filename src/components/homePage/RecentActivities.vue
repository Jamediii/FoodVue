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
        <el-col :span="6" :push="6" v-for="(o, index) in 2" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <router-link :to="`/activity/${activityId[index]}`">
              <img :src="activityImg[index]" class="image">
              <div style="padding: 14px;">
                <span>{{activityName[index]}}</span>
                <div class="bottom clearfix">
                  <p>{{activityState[index]}}</p>
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
        stopTime: [],
        activityImg:[],
        activityState: [],
        activityName: [],
        activityId: []
      }
    },
    mounted() {
      this.$axios.get("http://localhost:3000/competition").then((res) => {
        var data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          this.stopTime.push(data[i].activitySTime);
          this.activityState.push(data[i].activityState);
          this.activityName.push(data[i].activityName);
          this.activityImg.push(data[i].activityImg);
          this.activityId.push(data[i].activityId);
        }
        console.log(this.activityId);
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

  #recentActivity .activity img{
    height: 200px;
    width: 100%;
  }

</style>
