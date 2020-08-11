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
        <a-form-item label="排序">
          <a-input-number
            v-decorator="['sort', { rules: [{ required: true, message: '请输入排序！' }] }]"
            style="width:100%;"
          />
        </a-form-item>
        <a-form-item label="是否为几车内免费">
          <a-select
            v-decorator="['is_free', { rules: [{ required: true, message: '请选择是否为几车内免费！' }] }]"
            placeholder="请选择"
          >
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addCategory, editCategory } from '@/api/basic/category'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
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
      this.config.title = '新增物品分类'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑物品分类'
      this.config.id = record.id
      this.visible = true
      this.$nextTick(() => {
        const obj = pick(record, ['name', 'sort', 'is_free'])
        obj.is_free = obj.is_free.toString()
        this.form.setFieldsValue(obj)
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
            addCategory(values)
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
            editCategory(values)
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
