<template>
  <div class="modify-user">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="100px"
             class="demo-dynamic">
      <!--名字-->
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="用户名:"
                        prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!--电话号码-->
      <el-row>
        <el-col :span="16" :offset="4">
          <!--<el-form-item-->
          <!--label="电话号码:"-->
          <!--prop="phoneNo">-->
          <!--<el-input v-model="form.phoneNo"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item
            label="联系电话:"
            prop="phoneNo">
            <el-input v-model="form.phoneNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!--性别-->
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="性别:">
            <el-tooltip :content="'Switch value: ' + form.sex" placement="top">
              <el-switch
                v-model="form.sex"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="男"
                inactive-value="女"
                active-text="男"
                inactive-text="女">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>

      <!--用户头像 + 背景-->
      <app-ph :url="url" :form="form"></app-ph>


      <!-- 提交 -->
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item>
            <el-button type="primary" @click.native="onSubmit('form')">提交</el-button>
            <el-button @click.native="resetForm('form')">重置</el-button>
            <el-button @click.native="onHome">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>

<script>
  import PhotoModify from './PhotoModify';

  export default {
    name: "BasicModify",
    data() {
      return {
        // 提交路由
        url: {
          basic: 'http://127.0.0.1:3000/users/setting',
          headPhoto: 'http://127.0.0.1:3000/users/setting/headPhoto',
          settingWall: 'http://127.0.0.1:3000/users/setting/settingWall'
        },
        // 判断格式是否正确 + 绑定的表单内容
        form: {
          userId: '',
          name: '',
          phoneNo: '',
          // 性别
          sex: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, message: '名字长度至少为 1', trigger: 'blur'}
          ],
          phoneNo: [
            {pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '输入手机号格式不对', trigger: 'blur'},
            {required: true, message: '请输入手机号', trigger: 'blur'},

          ]
        }
      }
    },
    props: ['userid'],
    mounted() {
      this.form.userId = this.userid;
      this.$axios.get(`http://localhost:3000/users/${this.userid}`)
        .then(result => {
          this.form.name = result.data.data[0].accountName;
          this.form.phoneNo = result.data.data[0].phoneNo;
          if (result.data.data[0].sex === null || result.data.data[0].sex === '男') {
            this.form.sex = '男'
          } else {
            this.form.sex = '女'
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    components: {
      'app-ph': PhotoModify
    },
    methods: {
      // 提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            let _this = this;
            // // 基本信息上传
            // this.$axios({
            //   method: 'post',
            //   url: _this.url.basic,
            //   data: _this.form
            // }).then(res => {
            //   console.log(res.data);
            // }).catch(err => {
            //   console.log(err);
            // });


            // // 头像上传
            // this.$axios({
            //   method: 'post',
            //   url: _this.url.headPhoto,
            //   data: _this.formHead
            // }).then(res => {
            //   console.log(res.data);
            // }).catch(err => {
            //   console.log(err);
            // });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 取消
      onHome() {
        this.$router.push('/user')
      }
    },
  }
</script>

<style scoped>
  .modify-user {
    padding: 100px;
    width: 100%;
    height: 600px;
    background-color: #fff;
    /*height: 1000px;*/
  }
</style>
