<template>
  <div class="w" id="changeUserInfo">
    <div class="clearfloat">
      <el-row >
        <el-col :span="6">
          <h3>资料修改</h3>
          <div class="grid-content ">
            <!--左侧选择-->
            <el-menu default-active="1"
                     class="el-menu-vertical-demo"
                     @open="handleOpen" @close="handleClose"
                     :collapse="isCollapse">
              <el-menu-item style="border-right:0" index="1" @click="show=true">
                <i class="el-icon-menu"></i>
                <span slot="title">信息更改</span>
              </el-menu-item>
              <el-menu-item index="2" @click="show=false">
                <i class="el-icon-setting"></i>
                <span slot="title">密码更改</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <!--右侧-->
        <el-col :span="18" style="border-left:1px solid #ccc">
          <div class="grid-content">
            <app-basic class="content" v-if="show" :userid="userId"></app-basic>
            <app-Pwd class="content" v-else :userid="userId"></app-Pwd>
          </div>
        </el-col>
      </el-row>
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

  $(function () {
    $('#changeUserInfo').css('height',$(window).height() - 318);
  })
</script>

<style scoped>
</style>
