<template>
  <!--用户头像 + 背景-->
  <div>
    <!--头像-->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item label="头像上传:">
          <el-upload
            ref="upload"
            :action=url.headPhoto
            list-type="picture-card"
            :data="form"
            :limit="1"
            :before-upload='beforeUpload'
            :on-preview="onPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>
    <!--背景-->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item label="背景图片上传:">
          <el-upload
            class="upload-demo"
            :action=url.settingWall
            list-type="picture"
            :data="form"
            :limit="1"
            :before-upload='beforeUpload'>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PhotoModify",
    data() {
      return {
        // 头像上传
        dialogImageUrl: '',
        dialogVisible: false,
        formHead: '',

      }
    },

    props: ['url', 'form'],
    methods: {
      // 头像上传
      // 格式大小限制
      beforeUpload(file) {
        console.log(file.type.toLowerCase() === 'image/jpeg');
        console.log(file.type.toLowerCase() === 'image/jpeg');
        // 文件格式限定
        const isJPG = file.type.toLowerCase() === 'image/jpeg';
        const isPNG = file.type.toLowerCase() === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 jpeg,png 格式!(￣▽￣)"');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!(￣▽￣)"');
        }
        return (isJPG || isPNG) && isLt2M;
      },

      onPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

    },
  }
</script>

<style scoped>

</style>
