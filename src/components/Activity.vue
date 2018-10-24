<template>
  <div id="activity" class="w">
    <el-row class="actTop" :gutter="20">
      <!--活动详情左边部分-->
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <!--左边顶部部分-->
        <el-card :body-style="{ padding: '0px' }">
          <img :src="activityDetail.activityImgTop" style="width: 100%">
          <div style="padding: 14px;">
            <span>{{activityDetail.activityName}}</span>
            <div class="bottom clearfix">
              <h3>活动详情</h3>
            </div>
          </div>
        </el-card>
        <!--左边下面部分-->
        <el-card class="actMiddle" shadow="always">
          <div v-for="i in activityContent">
            <p>{{i}}！！！</p>
          </div>

          <!--显示获奖作品部分-->

          <div class="showResult" v-show="showActivityResult">
            <h3>获奖作品如下</h3>
            <el-col >
              <el-row>
                <el-col style="margin-top:20px;" v-for="(o,index) in mydata" :span="7" :key="index" :offset="1">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="o.recipeCoverImg" class="image">
                    <div style="padding: 14px;">
                      <span>{{o.recipeName}}
                        <i style="color:#FF7979" class="glyphicon glyphicon glyphicon-heart"></i>{{o.recipePraiseNum}}</span>
                      <div class="bottom clearfix">
                        <p>{{o.accountName}}</p>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>

          </div>

          <div v-show="!showActivityResult">
            <el-col  class="actbuttom" :span="12">
              <p>{{activityDetail.activityState}}</p>
            </el-col>
            <el-col  class="actbuttom" :span="12">
              <!--<p  style="text-decoration: none;color: #333;">-->
                <p @click="toUprecipe" style="background-color: #FF7979;">立即投稿</p>
            </el-col>
          </div>

        </el-card>
      </el-col>
      <!--活动详情右边部分-->
      <el-col class="hidden-xs-and-down" :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <img :src="activityDetail.activityImgRight" alt="">
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
        activityContent: [],
        showActivityResult: false,
        AResult:0,
        mydata:[]
      }
    },
    mounted() {
      var myid = this.$route.params.activityId;
      //根据活动ID获取活动详情
      this.$axios.post(`${$LH.url}/competition/activityDetail`, {
        activityId: myid
      })
        .then((res) => {
          this.activityDetail = res.data.data[0];
          this.activityContent = this.activityDetail.activityContent.split("；");
          if (this.activityDetail.activityState == "已截止") {
            this.showActivityResult = true;
          } else {
            this.showActivityResult = false;
          }
        }).catch((err) => {
        console.log(err);
      });

      //根据活动ID获取活动结果
      this.$axios.post(`${$LH.url}/competition/aresult`, {
        AdetailId: myid
      })
        .then((res) => {
          this.mydata = res.data.data;
        }).catch((err) => {
        console.log(err);
      });
    },
    methods:{
      //判断是否登录，如果已登录，就跳到编辑页面，未登录就跳到登录页面
      toUprecipe(){
        if(this.$store.state.user.state){
          this.$router.push('/menu');
        }else{
          this.$router.push('/login');
        }
      }
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

  #activity .actMiddle .actbuttom{
    margin-top: 20px;
  }
  #activity .actMiddle .actbuttom p {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  #activity .actTop .showResult img{
    height: 200px;
    width: 100%;
  }

</style>
