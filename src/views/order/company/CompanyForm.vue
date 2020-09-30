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
          label="来源"
          prop="source"
        >
          <!-- <a-input placeholder="请选择订单来源" v-model="form.name" /> -->
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
          ref="company"
          label="单位名称"
          prop="company"
        >
          <a-input placeholder="请输入单位名称" v-model="form.company" />
        </a-form-model-item>
        <a-form-model-item
          ref="linkman"
          label="联系人"
          prop="linkman"
        >
          <a-input placeholder="请输入联系人" v-model="form.linkman" />
        </a-form-model-item>
        <a-form-model-item
          ref="phone"
          label="联系电话"
          prop="phone"
        >
          <a-input placeholder="请输入联系电话" v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item
          ref="describe"
          label="描述"
          prop="describe"
        >
          <a-textarea placeholder="请输入描述" auto-size v-model="form.describe"/>
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
<style lang='less' scoped>
/deep/.ant-calendar-picker{
  width: 100%;
}
</style>
