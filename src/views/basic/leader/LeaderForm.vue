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
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          ref="name"
          label="姓名"
          prop="name"
        >
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item
          ref="phone"
          label="手机号"
          prop="phone"
        >
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { addLeader, editLeader } from '@/api/basic/leader'
export default {
  data () {
    // 手机格式验证
    const validatorPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号!'))
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('手机号格式不正确!'))
        } else {
          callback()
        }
      }
    }
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
      form: {
        name: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }]
      }
    }
  },
  created () {},
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增队长'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑队长'
      this.config.id = record.id
      this.visible = true
      this.form = JSON.parse(JSON.stringify(record))
    },
    handleSubmit () {
      const values = {
        name: this.form.name,
        phone: this.form.phone
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.config.action === 'add') {
            addLeader(values)
              .then(res => {
                this.$message.success('添加成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch(err => {
                this.$message.error(`${err.message}`)
              })
          } else if (this.config.action === 'edit') {
            values.id = this.config.id
            editLeader(values)
              .then(res => {
                this.$message.success('修改成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch(err => {
                this.$message.error(`${err.message}`)
              })
          }
        } else {
          this.confirmLoading = false
          return false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
