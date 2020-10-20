<template>
  <a-modal
    title="派单"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="负责人"
      >
        <a-cascader
          :options="options"
          :show-search="{ filter }"
          placeholder="请选择负责人"
          v-decorator="['leader_id',{ rules: [{ required: true, message: '请选择负责人!' }] }]"
          @change="onChange"
        />
      </a-form-item>
      <a-form-item style="display:none;">
        <a-input
          v-decorator="['id']"
          type="hidden"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getProjectLeader } from '@/api/common'
import { dispatchCompanyOrder } from '@/api/order/company'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      options: []
    }
  },
  created () {
    getProjectLeader({ t: new Date() }).then((res) => {
      this.options = res
    })
  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      if (record.leader_id === 0) {
        record.leader_id = [0, 0]
      }
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['leader_id', 'id']))
      })
    },
    handleSubmit () {
      const {
        form: { validateFields },
        $message
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          dispatchCompanyOrder(values)
            .then((res) => {
              $message.success('派单成功')
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
            })
            .catch((err) => {
              $message.error(`load user err: ${err.message}`)
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onChange (value) {
      console.log(value)
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    }
  }
}
</script>
