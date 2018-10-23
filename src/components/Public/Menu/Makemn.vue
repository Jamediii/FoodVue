<template>
  <div style="background-color:#fff; width: 80%; margin: 0 auto">

    <el-row>
      <el-col :span="8" :pull="1">
        <!-- 菜谱名称 + 大图 + 简介 -->
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="菜谱名称">
            <el-tooltip class="item" effect="dark" content="文字尽量限制在20字内" placement="right">
              <el-input v-model="dieltTitle"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="菜谱大图">
            <div>
              <label for="recipe">
                <img :src="basicPhoto" width="100%" alt="">
              </label>
            </div>
            <input type="file"
                   id="recipe"
                   ref='recipesPhoto'
                   @change="showBasicPh('recipesPhoto','basicPhoto')"
                   accept="image/jpeg,image/jpg,image/png"
                   style="display: none">
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea"
                      v-model="form.dieltSyon"
                      :autosize="{ minRows: 3, maxRows: 5}"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" :push="1">
        <!-- 烹饪时间 + 份量 + 食材 -->
        <el-form label-position="top"
                 label-width="80px"
                 ref="recipeNum"
                 :model="form">
          <el-form-item label="烹饪时间(分钟)">
            <el-select v-model="form.dieltTime" placeholder="请选择大致烹饪时间">
              <el-option label="5" value="5"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="15" value="15"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="25" value="25"></el-option>
              <el-option label="30" value="30"></el-option>
              <el-option label="35" value="35"></el-option>
              <el-option label="40" value="40"></el-option>
              <el-option label="45" value="45"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="份量(人份)">
            <el-select v-model="form.dieltWeight" placeholder="请选择大致烹饪时间">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8+" value="8+"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食材(名稱15字內，份量10字內，皆為必填!)">
            <div v-for="(obj,key) in form.foodlist">
              <el-row style="margin-bottom: 10px">
                <el-col :span="8">
                  <el-input
                    placeholder="食材名称"
                    v-model="obj.Name">
                    <i slot="suffix" class="ele-ico-third-caigoushicai"></i>
                  </el-input>
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-input placeholder="数量"
                            type="number"
                            v-model="obj.Num">
                    <i slot="suffix" class="ele-ico-third-shuzishurukuang"></i>
                  </el-input>
                </el-col>
                <el-col :span="2"
                        :push="1"
                        @click.native="delFoodList(form.foodlist,key)"
                        @mouseover.native="showIco(icoChange.foodIco,key)"
                        @mouseleave.native="hideIco(icoChange.foodIco,key)">
                  <i class="el-icon-circle-close-outline"
                     v-if=icoChange.foodIco[key]
                     style="font-size: 30px;vertical-align: middle;color:red"></i>
                  <i class="el-icon-circle-close"
                     v-else
                     style="font-size: 30px;vertical-align: middle;color:red"></i>
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-button style="width: 70%; margin-top: 15px"
                         type="success"
                         @click.native="addFoodList(form.foodlist)"
                         round>
                添加食材
              </el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :push="4">
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 label-position="top">
          <el-form-item label="步骤(可以一次上傳多張圖片)">
            <div v-for="(obj,key) in form.steplist">
              <div style="overflow: hidden">
                <!-- 图片上传 -->
                <div class="leftPhoto">
                  <label :for="`step${key}`">
                    <img :src="obj.stepPhoto" width="400px" alt="" style="margin-left: 12%">
                  </label>
                  <input type="file"
                         :id="`step${key}`"
                         :ref="`step${key}`"
                         @change="showBasicPh('step'+key,key)"
                         accept="image/jpeg,image/jpg,image/png"
                         style="display: none">
                </div>
                <!-- 步骤描述 -->
                <div class="rightDepict">
                  <strong style="font-size: 30px">{{key + 1}}</strong>
                  <div class="depictIco">
                    <el-col :span="2"
                            :push="1"
                            @click.native="delFoodList(form.steplist,key)"
                            @mouseover.native="showIco(icoChange.stepIco,key)"
                            @mouseleave.native="hideIco(icoChange.stepIco,key)">
                      <i class="el-icon-circle-close-outline"
                         v-if="icoChange.stepIco[key]"></i>
                      <i class="el-icon-circle-close"
                         v-else></i>
                    </el-col>

                    <el-col :span="2"
                            :push="1"
                            @click.native="addFoodList(form.steplist,key)"
                            @mouseover.native="showIco(icoChange.stepIco,key*2)"
                            @mouseleave.native="hideIco(icoChange.stepIco,key*2)">
                      <i class="el-icon-circle-plus-outline"
                         v-if="icoChange.stepIco[key*2]"></i>
                      <i class="el-icon-circle-plus"
                         v-else></i>
                    </el-col>
                  </div>
                  <el-input class="depict"
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 6}"
                            placeholder="请输入内容"
                            v-model="obj.stepContent">
                  </el-input>
                  <span>剩余150个字</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Makemn",
    data() {
      return {
        // 菜谱大图片
        basicPhoto: '',
        // 菜谱步骤图片
        stepsPhoto: '',
        form: {
          // 菜谱名称<name> + 大图<basicPhoto> + 简介<recipedDesc>
          dieltSyon: '',
          // 烹饪时间 + 份量 + 食材[]
          dieltTime: '',
          dieltWeight: '',
          foodlist: [
            {
              Num: '',
              Name: ''
            }
          ],
          steplist: [
            {
              stepPhoto: '',
              stepContent: ''
            }
          ],
        },
        // 图标的替换
        icoChange: {
          foodIco: [
            true
          ],
          stepIco: [
            true,true
          ]
        }

      }
    },
    // 挂载时显示的图片
    mounted() {
      this.$axios.get('http://localhost:3000/recipes/basicPhoto')
        .then(result => {
          this.basicPhoto = result.data.data.basicPhoto.replace(':', ':/');
          this.stepsPhoto = result.data.data.stepsPhoto.replace(':', ':/');
          this.form.steplist[0].stepPhoto = this.stepsPhoto;

        })
        .catch(err => {
          console.log(err);
        });
    },
    watch: {
      // 监听变化
      'form.steplist.length'(newLength, oldLength) {
        if (newLength > oldLength) {
          this.form.steplist[this.form.steplist.length - 1].stepPhoto = this.stepsPhoto;
        }
      }
    },
    computed: {
      dieltTitle() {
        return this.$route.params.menuName;
      }
    },
    methods: {
      // 检查输入的文字
      checkInputNum(input, maxLength) {
        this.form.num = input.length;
        if (this.form.num > maxLength) {
          this.$notify({
            title: '警告',
            message: `您输入的长度超过了${maxLength}个字`,
            type: 'warning'
          });
          this.form.num = maxLength;
        }
      },
      // 图片预览
      showBasicPh(inputName, fileSrc) {
        if (typeof FileReader == 'undefined') {
          this.$notify.error({
            title: '错误',
            message: "抱歉，你的浏览器不支持FileReader"
          });
          return false;
        }
        if (this.$refs[inputName].files) {
          var simpleFile = this.$refs[inputName].files[0];
        } else {
          var simpleFile = this.$refs[inputName][0].files[0];
        }
        console.log(simpleFile);
        if (!/image\/\w+/.test(simpleFile.type)) {
          this.$notify.error({
            title: '错误',
            message: "请确保文件类型为图像类型"
          });
          return false;
        }
        let reader = new FileReader();
        let _this = this;
        // 将文件以Data URL形式进行读入页面-- 转base64位
        reader.readAsDataURL(simpleFile);
        reader.onload = function (e) {
          if (fileSrc === 'basicPhoto') {
            _this[fileSrc] = this.result;
          } else {
            // fileSrc = fileSrc.replace(/[^\d]/gi,'');
            _this.form.steplist[fileSrc].stepPhoto = this.result;
          }
        }
      },
      // 显示图标
      showIco(keyObj,key) {
        keyObj[key] = false;
        console.log(keyObj);
      },
      hideIco(keyObj,key) {
        keyObj[key] = true;
        console.log(keyObj);
      },
      // 隐藏图标
      // 删除列表
      delFoodList(formArray, key) {
        if (formArray.length <= 1) {
          this.$message.error('不允许你再删除了! :(');
          return false;
        }
        console.log(key);
        formArray.splice(key, 1);
      },
      // 增加列表<要增加的表名>
      addFoodList(formName) {
        if (formName === this.form.foodlist) {
          formName.push({
            Num: '',
            Name: ''
          });
          this.icoChange.foodIco.push(true);
        } else {
          formName.push({
            stepPhoto: '',
            stepContent: ''
          });
        }
      }
    },
  }

  // $(function () {
  //   let dietP = '';
  //   // 显示
  //   $('input[type=file]').change(function () {
  //     let result = $(this);
  //     if (typeof FileReader == 'undefined') {
  //       result.text("抱歉，你的浏览器不支持FileReader");
  //     }
  //     var simpleFile = $(this)[0].files[0];
  //     console.log(simpleFile);
  //     if (!/image\/\w+/.test(simpleFile.type)) {
  //       alert("请确保文件类型为图像类型");
  //       return false;
  //     }
  //     var reader = new FileReader();
  //     // 将文件以Data URL形式进行读入页面-- 转base64位
  //     reader.readAsDataURL(simpleFile);
  //     reader.onload = function (e) {
  //       // console.log(this.result); // -- base64位
  //       dietP = this.result;
  //       result.parent().find('div').html('<img width="100%" height="100%" src="' + this.result + '" alt=""/>');
  //     }
  //   });
  //
  //   // 设定第一个默认被选中
  //   $(".dieltTime option:first").prop("selected", 'selected');
  //   $(".dieltPeo option:first").prop("selected", 'selected');
  //
  //   // 食材的操作
  //   $('.foodIco').on({
  //     mouseover() {
  //       $(this).removeClass('el-icon-circle-close-outline');
  //       $(this).addClass('el-icon-circle-close');
  //     },
  //     mouseleave() {
  //       $(this).removeClass('el-icon-circle-close');
  //       $(this).addClass('el-icon-circle-close-outline');
  //     },
  //     click() {
  //       if ($('.foodIco').length === 1) {
  //         alert('警告,这已经是最后一个食材了,不可以再删除了');
  //       } else {
  //         $(this).parent().parent().remove();
  //       }
  //     }
  //   });
  //   // 添加食材
  //   $('.addfood').click(function () {
  //     let $clon = $('.addFather').prev().clone(true);
  //     $clon.find('.foodlist').val('');
  //     $clon.insertBefore($('.addFather'));
  //   });
  //
  //   // 传数据
  //   $('input[type=button]').click(function () {
  //     //获取到标题 + 简介 + 烹饪时间 + 份量
  //     let dieltName = $('.dieltName').val();
  //     let dieltSyon = $('.dieltSyon').val();
  //     let dieltTime = $(".dieltTime option:selected").val();
  //     let dieltPeo = $(".dieltPeo option:selected").val();
  //
  //
  //     let foodlist = [];
  //     for (let i = 0; i < $('.foodlist').length; i += 2) {
  //       var food = {};
  //       food.Name = document.getElementsByClassName('foodlist')[i].value;
  //       food.Num = document.getElementsByClassName('foodlist')[i + 1].value;
  //       foodlist.push(food);
  //     }
  //
  //     let steplist = [];
  //     for (let j = 0; j < $('.stepTitle').length; j++) {
  //       let step = {};
  //       let formDataStep = new FormData();
  //       step.stepContent = document.getElementsByClassName('stepTitle')[j].value;
  //       step.stepPhoto = document.getElementsByClassName('stepFile')[j].files[0].name; // 获取到名字
  //       console.log(step.stepPhoto);
  //       steplist.push(step);
  //     }
  //
  //     let formData = new FormData();
  //     //-----食谱
  //     formData.append('userId', );
  //     formData.append('dieltTitle', dieltName);
  //     formData.append('dieltSyon', dieltSyon);
  //     formData.append('dieltTime', dieltTime);
  //     formData.append('dieltPeo', dieltPeo);
  //     //-----食材
  //     formData.append('foodlist', JSON.stringify(foodlist));
  //     //-----步骤
  //     formData.append('steplist', JSON.stringify(steplist));
  //
  //     //-----所有的图片
  //     for (var k = 0; k < $("[type=file]").length; k++) {
  //       // 传入的文件名设置 -------
  //       formData.append(`dieltFile${k}`, document.getElementsByClassName('file')[k].files[0]);
  //     }
  //
  //     $.ajax({
  //       url: 'http://127.0.0.1:3000/operat/upload',
  //       type: "POST",
  //
  //       cache: false,
  //       processData: false,
  //       contentType: false,
  //
  //       data: formData,
  //       success: function (data) {
  //         console.log('成功！' + data);
  //       },
  //       error: function (err) {
  //         console.log('失败' + err.message);
  //       }
  //     })
  //   });
  // });

</script>

<style scoped>
  .leftPhoto {
    float: left;
  }

  .rightDepict {
    width: 45%;
    float: left;
    margin-left: 140px;
    position: relative;
  }

  .rightDepict span {
    color: #aaa;
    font-size: 12px;
  }

  .depictIco {
    position: absolute;
    right: 0;
    top: 7px;
    font-size: 20px;
  }

  .depictIco > div {
    margin-left: 25px;
  }

  .depict {
    margin-top: 15px;
  }
</style>
