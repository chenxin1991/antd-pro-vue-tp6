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
        <a-form-item label="用户名">
          <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入用户名！' }] }]" />
        </a-form-item>

        <a-form-item label="真实姓名">
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入真实姓名！' }] }]" />
        </a-form-item>

        <a-form-item label="角色">
          <a-select
            v-decorator="['role_id', { rules: [{ required: true, message: '请选择角色！' }] }]"
            placeholder="请选择"
          >
            <a-select-option
              :key="index"
              v-for="(item, index) in params.roles"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addUser, editUser } from '@/api/setting/user'
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },
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
      this.config.title = '新增用户'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑用户'
      this.config.id = record.id
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['username', 'name', 'role_id']))
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
            addUser(values)
              .then((res) => {
                if (res.code === 200) {
                  $message.success(res.message)
                  this.visible = false
                  this.confirmLoading = false
                  this.$emit('ok', values)
                } else if (res.code === -2) {
                  $message.error(res.message)
                  this.confirmLoading = false
                } else if (res.code === -1) {
                  $message.error(res.message)
                  this.confirmLoading = false
                }
              })
              .catch((err) => {
                $message.error(`load user err: ${err.message}`)
              })
          } else if (this.config.action === 'edit') {
            values.id = this.config.id
            editUser(values)
              .then((res) => {
                if (res.code === 200) {
                  $message.success(res.message)
                  this.visible = false
                  this.confirmLoading = false
                  this.$emit('ok', values)
                } else if (res.code === -2) {
                  $message.error(res.message)
                  this.confirmLoading = false
                } else if (res.code === -1) {
                  $message.error(res.message)
                  this.confirmLoading = false
                }
              })
              .catch((err) => {
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
