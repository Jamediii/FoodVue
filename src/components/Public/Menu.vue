<template>
  <div id="agreeRule" class="w">
    <el-row>
      <el-col :span="16">
        <el-card shadow="always">
          <label for="agree">食谱名称</label>
          <hr/>
          <el-input id="agree" v-model="reNameInput" @keyup.native="checkInputNum" placeholder="请输入内容"></el-input>
          <div class="count">
            <span v-if="count">剩余{{20-wordLen}}个字</span>
            <span style="color:#a94442;" v-else-if="!count">超过{{wordLen-20}}个字</span>
          </div>
          <p>建议不要加上类似人名的名称，例如"王小丫的厨房"，避免食谱名称过长</p>
          <input type="checkbox" v-model="flog">
          <router-link to="/sitem">发布食谱即同意《乐享食间服务条款》</router-link>
          <br>
          <el-button style="width: 200px;" type="warning" @click="doMenu" :disabled="!flog">确定</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    data() {
      return {
        flog: false,
        reNameInput: "",
        count: true,
        wordLen: 0
      }
    },
    methods: {
      doMenu() {
        if (this.reNameInput.length) {
          this.$router.push(`/makemn/${this.reNameInput}`);
        } else {
          this.$alert('食谱名称不能为空或者过长！', '食谱名称不正确', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }

      },
      checkInputNum() {
        this.wordLen = this.reNameInput.length;
        if (this.wordLen < 20) {
          this.count = true;
        } else {
          this.count = false;
        }
      }
    }
  }
</script>

<style scoped>
  /*同意网站协议规则部分开始*/
  #agreeRule {
    font-size: 16px;
  }

  #agreeRule hr {
    background-color: #666;;
    height: 1px;
    border: none;
  }

  #agreeRule label {
    font-size: 18px;
    color: #333;
  }

  a:hover {
    color: blue;
    text-decoration: underline;
  }

  /*同意网站协议规则部分结束*/
</style>
