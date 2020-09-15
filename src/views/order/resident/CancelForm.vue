  <!-- 更多-取消订单弹框 -->
<template>
  <div>
    <a-modal
      v-model="visibleCancel"
      title="订单取消原因"
      @ok="handleOkCancel"
    >
      <a-radio-group
        v-model="value"
        @change="onChange"
      >
        <a-radio
          :style="radioStyle"
          :value="value1"
        >
          价格太贵
        </a-radio>
        <a-radio
          :style="radioStyle"
          :value="value2"
        >
          客户预定时间排不下
        </a-radio>
        <a-radio
          :style="radioStyle"
          :value="3"
        >
          其他
          <a-input
            v-if="value === 3"
            placeholder="请输入其他原因"
            v-model="moreValue"
            :allowClear="true"
            :style="{ width: 100, marginLeft: 10 }"
          />
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'CancelForm',
  data () {
    return {
      visibleCancel: false, // 取消订单
      value: '',
      value1: '价格太贵',
      value2: '客户预定时间排不下',
      moreValue: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      }
    }
  },

  components: {},

  computed: {},

  mounted () {},

  created () {},

  methods: {
    // 更多-取消订单
    showModal () {
      this.visibleCancel = true
    },
    // 更多-取消订单原因
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
    // 点击确定
    handleOkCancel () {
        //  console.log('moreValue', this.moreValue)
      if (this.value === 3 && this.moreValue === '') {
            this.$message.error('请输入/选择取消订单原因')
      } else {
           this.visibleCancel = false
      }
    }

  }
}
</script>
<style lang='less' scoped>
</style>
