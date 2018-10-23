<template>
  <div class="w" style="background-color:#fff;">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col>

          <el-row>
            <el-col :span="12">
              <el-form-item label="菜谱名:">
                <el-tooltip class="item" effect="dark" content="字数限制在20字内" placement="right">
                  <input type="text" v-model="name" class="dieltName" name="dieltTitle"><br/>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="简介:">
            <textarea rows="5"
                      class="dieltSyon"
                      name="dieltSyon"
                      placeholder="输入菜谱描述"
                      v-model="form.titleLength"
                      @keyup="checkInputNum(form.titleLength,200)"
            ></textarea>
                <span>剩余{{200-form.num}}个字</span>

              </el-form-item>

              <el-form-item label="菜谱图片:" class="dietPhoto">
                <label for="file">
                  <div class="recipesPhoto"></div>
                </label>
                <input type="file" name="dietPhoto" id="file" class="file" style="display: none"><br/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="烹饪时间(分钟):">
                <select class="dieltTime">
                  <option value="未设定" disabled>未设定</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                </select>
              </el-form-item>

              <el-form-item label="份量(人数):">
                <select class="dieltPeo">
                  <option value="未设定" disabled>未设定</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7+">7+</option>
                </select>
              </el-form-item>

              <el-form-item label="食材:">
                <el-row>
                  <el-col :span="8">
                    <input type="text" class="foodlist" name="food1" placeholder="食材名称"><br/>
                  </el-col>
                  <el-col :span="4" :offset="4">
                    <input type="number" min="0" class="foodlist" name="food1" placeholder="份量"><br/>
                  </el-col>
                  <el-col :span="4" :offset="4">
                    <i class="el-icon-circle-close-outline foodIco"
                       style="font-size: 30px;vertical-align: middle;color:red"></i>
                  </el-col>
                </el-row>
                <el-row class="addFather">
                  <el-col>
                    <el-button class="addfood" style="width: 90%;margin-left: 10px" type="success" round>添加食材
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <div id="steps">
                <el-row>
                  <el-col :span="16" :push="8">
                    步骤 1：
                    <input type="text" class="stepTitle" name="stepTitle"><br/>
                  </el-col>
                  <el-col :span="6" :pull="16">
                    图片 1：
                      <div style="width: 250px; height: 175px; background-color:#000;">
                      </div>
                    <input type="file" name="stepFile" class="stepFile file" ><br/>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16" :push="8">
                    步骤 2：
                    <input type="text" class="stepTitle" name="stepTitle"><br/>
                  </el-col>
                  <el-col :span="6" :pull="16">
                    图片 2：
                    <div style="width: 250px; height: 175px; background-color:#000;">
                    </div>
                    <input type="file" name="stepFile" class="stepFile file" ><br/>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <input type="button" value="提交">


        </el-col>
      </el-row>
    </el-form>


  </div>

</template>

<script>
  export default {
      name: "Makemn",
      data() {
        return {
          form: {
            titleLength: '',
            num: 0
          }
        }
      },
      computed: {
        name() {
          return this.$route.params.menuName;
        }
      },
      methods: {
        checkInputNum(input, maxLength) {
          this.form.num = input.length;
          if (this.form.num > maxLength) {
            this.$notify({
              title: '警告',
              message: '您输入的长度超过了200个字',
              type: 'warning'
            });
            this.form.num = maxLength;
          }
        }
      }
    }

  $(function () {
    let dietP = '';
    // 显示
    $('input[type=file]').change(function () {
      let result = $(this);
      if (typeof FileReader == 'undefined') {
        result.text("抱歉，你的浏览器不支持FileReader");
      }
      var simpleFile = $(this)[0].files[0];
      console.log(simpleFile);
      if (!/image\/\w+/.test(simpleFile.type)) {
        alert("请确保文件类型为图像类型");
        return false;
      }
      var reader = new FileReader();
      // 将文件以Data URL形式进行读入页面-- 转base64位
      reader.readAsDataURL(simpleFile);
      reader.onload = function (e) {
        // console.log(this.result); // -- base64位
        dietP = this.result;
        result.parent().find('div').html('<img width="100%" height="100%" src="' + this.result + '" alt=""/>');
      }
    });

    // 设定第一个默认被选中
    $(".dieltTime option:first").prop("selected", 'selected');
    $(".dieltPeo option:first").prop("selected", 'selected');

    // 食材的操作
    $('.foodIco').on({
      mouseover() {
        $(this).removeClass('el-icon-circle-close-outline');
        $(this).addClass('el-icon-circle-close');
      },
      mouseleave() {
        $(this).removeClass('el-icon-circle-close');
        $(this).addClass('el-icon-circle-close-outline');
      },
      click() {
        if ($('.foodIco').length === 1) {
          alert('警告,这已经是最后一个食材了,不可以再删除了');
        } else {
          $(this).parent().parent().remove();
        }
      }
    });
    // 添加食材
    $('.addfood').click(function () {
      let $clon = $('.addFather').prev().clone(true);
      $clon.find('.foodlist').val('');
      $clon.insertBefore($('.addFather'));
    });

    // 传数据
    $('input[type=button]').click(function () {
      //获取到标题 + 简介 + 烹饪时间 + 份量
      let dieltName = $('.dieltName').val();
      let dieltSyon = $('.dieltSyon').val();
      let dieltTime = $(".dieltTime option:selected").val();
      let dieltPeo = $(".dieltPeo option:selected").val();


      let foodlist = [];
      for (let i = 0; i < $('.foodlist').length; i += 2) {
        var food = {};
        food.Name = document.getElementsByClassName('foodlist')[i].value;
        food.Num = document.getElementsByClassName('foodlist')[i + 1].value;
        foodlist.push(food);
      }

      let steplist = [];
      for (let j = 0; j < $('.stepTitle').length; j++) {
        let step = {};
        let formDataStep = new FormData();
        step.stepContent = document.getElementsByClassName('stepTitle')[j].value;
        step.stepPhoto = document.getElementsByClassName('stepFile')[j].files[0].name; // 获取到名字
        console.log(step.stepPhoto);
        steplist.push(step);
      }

      let formData = new FormData();
      //-----食谱
      formData.append('userId', );
      formData.append('dieltTitle', dieltName);
      formData.append('dieltSyon', dieltSyon);
      formData.append('dieltTime', dieltTime);
      formData.append('dieltPeo', dieltPeo);
      //-----食材
      formData.append('foodlist', JSON.stringify(foodlist));
      //-----步骤
      formData.append('steplist', JSON.stringify(steplist));

      //-----所有的图片
      for (var k = 0; k < $("[type=file]").length; k++) {
        // 传入的文件名设置 -------
        formData.append(`dieltFile${k}`, document.getElementsByClassName('file')[k].files[0]);
      }

      $.ajax({
        url: 'http://127.0.0.1:3000/operat/upload',
        type: "POST",

        cache: false,
        processData: false,
        contentType: false,

        data: formData,
        success: function (data) {
          console.log('成功！' + data);
        },
        error: function (err) {
          console.log('失败' + err.message);
        }
      })
    });
  });

</script>

<style scoped>
  /* 设置所有input标签的基本样式 */
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }

  /* 设置简介样式 */
  .dieltSyon {
    width: 100%;
    resize: none;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }

  /* 设置菜谱大图样式 */
  .recipesPhoto {
    width: 200px;
    height: 150px;
    background-color: #fd6c32;
  }

  /* 设置烹饪时间样式 */
  .dieltTime, .dieltPeo {
    width: 100%;
    height: 30px;
  }

  /* 食材种类与份量 */
  .foodlist {
    margin: 0 0 10px 10px;
  }
</style>
