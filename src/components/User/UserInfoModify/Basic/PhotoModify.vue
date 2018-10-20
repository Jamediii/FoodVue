<template>
  <!--用户头像 + 背景-->
  <div>
    <!--头像-->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item label="头像上传:">
          <el-upload
            :action=url.headPhoto
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-progress="handleProgress"
            :before-remove="handleRemove"
            :limit="1"
            with-credentials
            @change.native="watchUser.userHead=true">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>
    <!--背景
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item label="背景图片上传:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-progress="handleProgress"
            :before-remove="handleRemove"
            :limit="1"
            list-type="picture"
            :auto-upload=false
            @change.native="watchUser.settingWall=true">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>-->
  </div>

</template>

<script>
  export default {
    name: "PhotoModify",
    data() {
      return {
        userId: '',

        // 提交路由
        url: {
          basic: 'http://localhost:3000/users/setting',
          headPhoto: 'http://localhost:3000/users/setting/headPhoto',
          settingWall: 'http://localhost:3000/users/setting/settingWall'
        },

        // 辨别是要哪一个
        watchUser: {
          userHead: false,
          settingWall: false,
        },
        // 操作
        userOperate: {
          userHead: '',
          settingWall: ''
        },

        // 头像上传
        dialogImageUrl: '',
        dialogVisible: false,
        formHead: ''
      }
    },
    watch: {
      'watchUser.userHead'(newData) {
        this.userOperate.userHead = newData
      },
      'watchUser.settingWall'(newData) {
        this.userOperate.settingWall = newData
      }
    },
    props: ['form', 'userid'],
    mounted() {
      this.userId = this.userid
    },
    methods: {
      // 头像上传
      // 格式大小限制
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload(file) {
        // 文件格式限定
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 1;
        console.log(file);
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpeg,png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }

        let _this = this;
        // 用户Id
        let userId = this.userId;
        // 文件的存入
        this.formHead = new FormData();
        this.formHead.append('userId', userId);
        this.formHead.append('file', file, file.name);
        // this.formData.append("headPhoto", JSON.stringify(file)); //把整个文件传到后台就好

        return (isJPG || isPNG) && isLt2M;
      },

      // 点击文件列表中已上传的文件时的钩子
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        return false;
      },
      // 文件上传时的钩子 -- 做更新
      handleProgress(event, file, fileList) {
        console.log(file);
      },
      // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      handleRemove(file, fileList) {
      },

    },
  }
</script>

<style scoped>

</style>
