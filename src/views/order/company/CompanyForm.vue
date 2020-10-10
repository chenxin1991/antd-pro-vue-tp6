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
          ref="source"
          label="订单来源"
          prop="source"
        >
          <a-select
            allowClear
            v-model="form.source"
            placeholder="请选择订单来源"
          >
            <a-select-option value="1">员工或朋友推荐</a-select-option>
            <a-select-option value="2">客户打电话到前台</a-select-option>
            <a-select-option value="3">小程序下单</a-select-option>
            <a-select-option value="4">提前介入项目</a-select-option>
            <a-select-option value="5">合作伙伴介绍项目</a-select-option>
            <a-select-option value="6">其他来源</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          ref="name"
          label="单位名称"
          prop="name"
        >
          <a-input
            placeholder="请输入单位名称"
            v-model="form.name"
          />
        </a-form-model-item>

        <a-form-model-item
          ref="customer"
          label="联系人"
          prop="customer"
        >
          <a-input
            placeholder="请输入联系人"
            v-model="form.customer"
          />
        </a-form-model-item>
        <a-form-model-item
          ref="phone"
          label="联系电话"
          prop="phone"
        >
          <a-input
            placeholder="请输入联系电话"
            v-model="form.phone"
          />
        </a-form-model-item>
        <a-form-model-item
          ref="description"
          label="描述"
          prop="description"
        >
          <a-textarea
            placeholder="请输入描述"
            :auto-size="{ minRows: 3, maxRows: 6 }"
            v-model="form.description"
          />
        </a-form-model-item>

      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { addCompanyOrder, editCompanyOrder } from '@/api/order/company'
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
        source: '',
        name: '',
        customer: '',
        phone: '',
        description: ''
      },
      rules: {
        source: [{ required: true, message: '请选择订单来源', trigger: 'blur' }],
        name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
        customer: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      }
    }
  },
  created () {},
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增订单'
      this.visible = true
      this.$nextTick(() => {
      this.form = {}
      this.$refs.ruleForm.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑订单'
      this.config.id = record.id
      this.visible = true
      this.form = JSON.parse(JSON.stringify(record))
      if (this.form.source === 1) this.form.source = '员工或朋友推荐'
      if (this.form.source === 2) this.form.source = '客户打电话到前台'
      if (this.form.source === 3) this.form.source = '小程序下单'
      if (this.form.source === 4) this.form.source = '提前介入项目'
      if (this.form.source === 5) this.form.source = '合作伙伴介绍项目'
      if (this.form.source === 6) this.form.source = '其他来源'
    },
    handleSubmit () {
      const values = {
        source: this.form.source,
        name: this.form.name,
        customer: this.form.customer,
        phone: this.form.phone,
        description: this.form.description
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.config.action === 'add') {
            addCompanyOrder(values)
              .then(res => {
                this.$message.success('添加成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
                this.form = {}
              })
              .catch(err => {
                this.$message.error(`${err.message}`)
              })
          } else if (this.config.action === 'edit') {
            values.id = this.config.id
            editCompanyOrder(values)
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
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style lang='less' scoped>
</style>
