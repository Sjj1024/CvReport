<template>
  <div class="test-box">
    <div class="form-box">
      <el-form
        ref="form"
        :model="sizeForm"
        label-position="right"
        label-width="150px"
        class="form-inline"
      >
        <div class="inline">
          <el-form-item label="任务名称">
            <el-select
              v-model="sizeForm.taskName"
              placeholder="请选择任务名称"
            >
              <el-option
                v-for="item in taskNames"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号">
            <el-select
              v-model="sizeForm.version"
              placeholder="请选择版本号"
            >
              <el-option
                v-for="item in versions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="训练用的Epoch">
            <el-select
              v-model="sizeForm.epoch"
              placeholder="请选择Epoch"
            >
              <el-option
                v-for="item in epochs"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用GPU数量">
            <el-select
              v-model="sizeForm.gpu"
              placeholder="请选择GPU数量"
            >
              <el-option
                v-for="item in gpus"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="start-btn">
          <el-button
            type="primary"
            @click="startTest"
          >开始测试</el-button>
        </div>
      </el-form>
    </div>
    <div
      class="progress"
      v-if="timer"
    >
      <span class="log-title">测试进度：</span>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        text-color="white"
        :percentage="progressValue"
      ></el-progress>
    </div>
    <div
      class="result"
      v-if="showResult"
    >
      <span class="log-title">测试结果：</span>
      <div class="result-box">
        <div>char_recall(召回率)：0.9417</div>
        <div>char_precision(查准)：0.9304</div>
        <div>word_acc(全匹配模式):0.7134</div>
        <div>word_acc_ignore_case(忽略大小写的匹配模式):0.7134</div>
        <div>
          word_acc_ignore_case_symbol(忽略大小写及符号的匹配模式):0.7325
        </div>
      </div>
    </div>
    <div
      class="img-list"
      v-show="showResult"
    >
      <span class="log-title">图例：</span>
      <div class="img-split">
        <div class="img-left">
          <span class="case">Good Case</span>
          <div class="img-box">
            <img
              v-for="(item, index) in goodImgs"
              :key="index"
              :src="item.img"
              alt=""
              class="img-item"
            />
          </div>
        </div>
        <div class="img-right">
          <span class="case">Bad Case</span>
          <div class="img-box">
            <img
              v-for="(item, index) in badImgs"
              :key="index"
              :src="item.img"
              alt=""
              class="img-item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-index',
  data() {
    return {
      sizeForm: {
        taskName: '',
        version: '',
        epoch: 'best_epoch_47: (Acc:0.7649,Loss:0.6376)',
        batterEpoch: null,
        gpu: '4'
      },
      taskNames: [
        'OCR_印章文本识别_demo1',
        'OCR_印章文本识别_demo2',
        'OCR_印章文本识别_demo3'
      ],
      versions: ['V1', 'V2', 'V3'],
      epochs: [
        'epoch_10 :  (Acc:0.5801,Loss:0.9810)',
        'epoch_20 :  (Acc:0.6550,Loss:0.7539)',
        'epoch_30 :  (Acc:0.6801,Loss:0.7099)',
        'epoch_40 :  (Acc:0.7140,Loss:0.6576)',
        'best_epoch_47: (Acc:0.7649,Loss:0.6376)',
        'epoch_50 :  (Acc:0.7587,Loss:0.6081)'
      ],
      gpus: ['1', '2', '3', '4'],
      timer: '',
      progressValue: 0,
      goodImgs: [],
      badImgs: [],
      showResult: false
    }
  },
  created() {
    const goodimgList = require.context('../../../assets/goodcase', true, /.*/)
    this.goodImgs = goodimgList.keys().map((item) => {
      return { img: require('../../../assets/goodcase' + item.substr(1)) }
    })
    const badimgList = require.context('../../../assets/badcase', true, /.*/)
    this.badImgs = badimgList.keys().map((item) => {
      return { img: require('../../../assets/badcase' + item.substr(1)) }
    })
  },
  methods: {
    startTest(e) {
      console.log('开始测试')
      let target = e.target
      if (target.nodeName === 'SPAN') {
        target = e.target.parentNode
      }
      target.blur()
      if (!this.progressValue) {
        this.timer = setInterval(() => {
          let progressValue = this.progressValue + 1
          this.progressValue = +progressValue.toFixed(2)
          if (this.progressValue >= 100) {
            clearInterval(this.timer)
            setTimeout(
              () =>
                // 展示结果
                (this.showResult = true),
              1000
            )
          }
        }, 200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test-box {
  .form-inline {
    margin-left: -40px;
    margin-top: 20px;
    .inline {
      display: flex;
      justify-content: flex-start;
      /deep/ .el-form-item {
        width: 460px;
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .start-btn {
    text-align: center;
  }
  .progress {
    margin: 15px 0px 6px 0px;
  }

  .log-title {
    display: block;
    font-size: 16px;
    margin: 15px 0px 6px 0px;
  }

  .result-box {
    color: #fff;
    padding: 10px;
    background-color: #000;
  }

  .img-split {
    display: flex;
    justify-content: space-between;
    .img-left,
    .img-right {
      width: 48%;
    }
    .img-box {
      overflow-y: auto;
      height: 500px;
      border: 2px solid #000;
      padding: 10px;
      padding-bottom: 0px;
      background-color: #000;
      .img-item {
        width: 100%;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-shadow: 0 0 5px #ccc;
      }
      .img-item:last-child {
        margin-bottom: 8px;
      }
    }
  }
}
</style>