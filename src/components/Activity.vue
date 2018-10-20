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
            <p>{{i}}</p>
          </div>

          <!--显示获奖作品部分-->
          <div class="showResult" v-show="showActivityResult">
            <el-col >
              <el-row>
                <el-col style="margin-top:20px;" v-for="(o,index) in mydata" :span="7" :key="index" :offset="1">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="o.recipeCoverImg" class="image">
                    <div style="padding: 14px;">
                      <span>{{AResultRecipeName[index]}}
                        <i style="color:#FF7979" class="glyphicon glyphicon glyphicon-heart"></i>{{recipePraiseNum[index]}}</span>
                      <div class="bottom clearfix">
                        <p>{{AResultAuthorName[index]}}</p>
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
              <router-link to="/menu" style="text-decoration: none;color: #333;"><p style="background-color: #FF7979;">
                立即投稿</p></router-link>
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
        AResultAuthorName:[],
        AResultImg:[],
        AResultRecipeName:[],
        recipePraiseNum:[],
        AResult:0,
        mydata:[]
      }
    },
    mounted() {
      var myid = this.$route.params.activityId;
      //根据活动ID获取活动详情
      this.$axios.post("http://localhost:3000/competition/activityDetail", {
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
          // console.log(this.activityDetail);
        }).catch((err) => {
        console.log(err);
      });

      //根据活动ID获取活动结果
      this.$axios.post("http://localhost:3000/competition/aresult", {
        AdetailId: myid
      })
        .then((res) => {
          this.mydata = res.data.data;
          this.AResult = this.mydata.length;
          for (var i = 0; i < this.AResult; i++) {
            this.AResultImg.push(this.mydata[i].recipeCoverImg);
            this.AResultAuthorName.push(this.mydata[i].accountName);
            this.AResultRecipeName.push(this.mydata[i].recipeName);
            this.recipePraiseNum.push(this.mydata[i].recipePraiseNum);
          }
          console.log(this.mydata);
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
