<template>
  <div id="activity" class="w">
    <el-row class="actTop" :gutter="20">
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../assets/activity_headPic.jpg" style="width: 100%">
          <div style="padding: 14px;">
            <span>{{activityDetail.activityName}}</span>
            <div class="bottom clearfix">
              <h3>活动详情</h3>
            </div>
          </div>
        </el-card>
        <el-card class="actMiddle" shadow="always">
          <div v-for="i in activityContent">
            <h2></h2>
            <p>{{i}}</p>
          </div>
          <el-col class="actbuttom" :span="12">
            <p>{{activityDetail.activityState}}</p>
          </el-col>
          <el-col class="actbuttom" :span="12">
            <router-link to="/menu" style="text-decoration: none;color: #333;"><p style="background-color: #FF7979;">立即投稿</p></router-link>
          </el-col>
        </el-card>
      </el-col>
      <el-col class="hidden-xs-and-down" :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <img src="../assets/activity1_rightPic.jpg" alt="">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: "Activity",
    data() {
      return {
        activityDetail: {},
        activityContent: {}
      }
    },
    mounted() {
      this.$axios.get("http://localhost:3000/competition")
        .then((res) => {
          this.activityDetail = res.data.data[0];
          this.activityContent = this.activityDetail.activityContent.split("；");
          console.log(this.activityContent);
        }).catch((err) => {
        console.log(err);
      });
    }
  }
</script>

<style scoped>
  #activity {
    margin-top: 20px;
  }

  #activity .actTop .el-col:first-child h3 {
    padding-top: 10px;
  }

  #activity .actMiddle {
    margin-top: 20px;
  }
  #activity .actMiddle .actbuttom p{
    text-align: center;
    height: 40px;
    line-height: 40px;
    border:1px solid #ccc;
    border-radius: 20px;
  }

</style>
