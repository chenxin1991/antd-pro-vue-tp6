  <!-- 更多-取消订单弹框 -->
<template>
  <div>
    <a-modal
      v-model="visibleCancel"
      title="订单取消原因"
      :confirmLoading="confirmLoading"
      @ok="handleOkCancel"
      @cancel="handleCancel"
    >
      <a-radio-group
        v-model="value"
        @change="onChange"
      >
        <a-radio
          :style="radioStyle"
          :value="`价格太贵`"
        >
          价格太贵
        </a-radio>
        <a-radio
          :style="radioStyle"
          :value="`客户预定时间排不下`"
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
import { cancelResidentOrders } from '@/api/order/resident'
export default {
  name: 'CancelForm',
  data () {
    return {
      visibleCancel: false, // 取消订单
      value: '',
      moreValue: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      confirmLoading: false,
      id: 0
    }
  },

  components: {},

  computed: {},

  mounted () {},

  created () {},

  methods: {
    showModal (record) {
      this.visibleCancel = true
      this.id = record.id
    },
    // 取消订单原因
    onChange (e) {
      this.value = e.target.value
    },
    // 点击确定
    handleOkCancel () {
      const that = this
      if (this.value === '') {
        this.$message.error('请选择取消订单原因')
        return false
      }
      if (this.value === 3 && this.moreValue === '') {
        this.$message.error('请输入取消订单原因')
        return false
      }
      const cancelReason = this.value === 3 ? this.moreValue : this.value
      this.confirmLoading = true
      cancelResidentOrders({ id: this.id, cancelReason: cancelReason })
        .then((res) => {
          that.$message.success('取消成功')
          this.visibleCancel = false
          this.confirmLoading = false
          this.$emit('ok', { id: this.id, cancelReason: cancelReason })
        })
        .catch((err) => {
          that.$message.error(`${err.message}`)
        })
    },
    // 点击取消
    handleCancel () {
      this.value = ''
      this.visibleCancel = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
