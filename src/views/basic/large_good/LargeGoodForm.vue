<template>
  <a-modal
    :title="config.title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form
        :form="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="名称">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入名称！' }] }]" />
        </a-form-item>
        <a-form-item label="单价（元）">
          <a-input-number
            :min="0"
            v-decorator="[
              'price',
              {
                rules: [{ required: true, message: '请输入单价！' }],
              },
            ]"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="单位">
          <a-input v-decorator="['unit', { rules: [{ required: true, message: '请输入单位！' }] }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addLargeGood, editLargeGood } from '@/api/basic/large_good'
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
      config: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增拆装件'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑拆装件'
      this.config.id = record.id
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['name', 'price', 'unit']))
      })
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      const { $message } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (this.config.action === 'add') {
            addLargeGood(values)
              .then(res => {
                $message.success('添加成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch(err => {
                $message.error(`load user err: ${err.message}`)
              })
          } else if (this.config.action === 'edit') {
            values.id = this.config.id
            editLargeGood(values)
              .then(res => {
                $message.success('修改成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch(err => {
                $message.error(`load user err: ${err.message}`)
              })
          }
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
