<template>
  <div class="w">
    <div class="clearfloat">
      <app-basic class="content" v-if="show" :userid="userId"></app-basic>
      <app-Pwd class="content" v-else :userid="userId"></app-Pwd>
      <!--左侧选择-->
      <el-menu default-active="1"
               class="el-menu-vertical-demo"
               @open="handleOpen" @close="handleClose"
               :collapse="isCollapse">
        <!-- 展开或者收起 -->
        <!--<el-radio-group v-model="isCollapse"
                        style="margin-bottom: 20px;">
          <el-button size="mini" :label="false" v-show="isCollapse">展开</el-button>
          <el-button size="mini" :label="true" v-show="!isCollapse">收起</el-button>
        </el-radio-group>-->
        <el-menu-item index="1" @click="show=true">
          <i class="el-icon-menu"></i>
          <span slot="title">信息更改</span>
        </el-menu-item>
        <el-menu-item index="2" @click="show=false">
          <i class="el-icon-setting"></i>
          <span slot="title">密码更改</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import BasicModify from './Basic/BasicModify';
  import PasswordModify from './Password/PasswordModify';
  export default {
    name: "EditUserInfo",
    data() {
      return {
        // 用户Id
        userId: '',
        // 显示隐藏
        isCollapse: false,
        // 显示用户 / 密码
        show: true
      }
    },
    // 页面挂载的时候
    created() {
      this.userId = this.$store.state.user.userId;
    },
    components: {
      'app-basic': BasicModify,
      'app-Pwd': PasswordModify
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  /*浮动清除*/
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 300px;
  }
  .el-menu-vertical-demo {
    float: left;
    margin-left: calc(-100% - 400px);
    height: 800px;
  }
  .content {
    float: left;
    width: 100%;
  }
</style>
