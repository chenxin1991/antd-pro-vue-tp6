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
        label="队长"
      >
        <a-select
          show-search
          :filter-option="filter"
          v-decorator="['leader',{ rules: [{ required: true, message: '请选择队长!' }] }]"
        >
          <a-select-option
            :key="index"
            v-for="(item, index) in leaders"
            :value="item.id"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item style="display:none;">
        <a-input v-decorator="['id']" type="hidden"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getLeaders } from '@/api/common'
import { dispatchResidentOrders } from '@/api/order/resident'
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
      leaders: []
    }
  },
  created () {
    getLeaders({ t: new Date() }).then(res => {
      this.leaders = res
    })
  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      if (record.leader === 0) {
        record.leader = ''
      }
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['leader', 'id']))
      })
    },
    filter (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleSubmit () {
      const {
        form: { validateFields }, $message
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            dispatchResidentOrders(values)
              .then(res => {
                $message.success('添加成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch(err => {
                $message.error(`load user err: ${err.message}`)
              })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
