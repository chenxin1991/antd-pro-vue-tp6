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
        layout="vertical"
        hide-required-mark
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="车型">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入车型！' }],
                  },
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="载重（吨）">
              <a-input-number
                :min="0"
                v-decorator="[
                  'load',
                  {
                    rules: [{ required: true, message: '请输入载重！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="长宽高（米）">
              <a-input
                v-decorator="[
                  'size',
                  {
                    rules: [{ required: true, message: '请输入长宽高！' }],
                  },
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="体积（方）">
              <a-input-number
                :min="0"
                v-decorator="[
                  'volume',
                  {
                    rules: [{ required: true, message: '请输入体积！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="单价（元/车）">
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
          </a-col>
          <a-col :span="12">
            <a-form-item label="超多少公里收费">
              <a-input-number
                :min="0"
                v-decorator="[
                  'km_standard',
                  {
                    rules: [{ required: true, message: '请输入超多少公里收费！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="公里数单价（元）">
              <a-input-number
                :min="0"
                v-decorator="[
                  'km_price',
                  {
                    rules: [{ required: true, message: '请输入公里数单价！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addCar, editCar } from '@/api/basic/car'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
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
      this.config.title = '新增车型'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑车型'
      this.config.id = record.id
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['name', 'load', 'size', 'volume', 'price', 'km_standard', 'km_price']))
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
            addCar(values)
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
            editCar(values)
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

<style lang="less" scoped>
.ant-form-item {
    margin-bottom: 8px;
}
</style>
