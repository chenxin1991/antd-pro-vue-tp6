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
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getLeaders } from '@/api/common'
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
      leaders: [],
      mdl: {}
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
      this.mdl = Object.assign({}, record)
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(pick(this.mdl, ['leader']))
      })
    },
    filter (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
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
