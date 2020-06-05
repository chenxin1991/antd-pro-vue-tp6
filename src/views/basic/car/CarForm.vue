<template>
  <a-modal
    :title="config.title"
    :width="720"
    style="top: 40px;"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :bodyStyle="{padding:'8px 24px'}"
  >
    <a-spin :spinning="confirmLoading">
      <a-form
        :form="form"
        layout="vertical"
      >
        <a-divider orientation="left">
          车型信息
        </a-divider>
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
            <a-form-item label="超多少公里计费">
              <a-input-number
                :min="0"
                v-decorator="[
                  'km_standard',
                  {
                    rules: [{ required: true, message: '请输入超多少公里计费！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="超出公里数单价（元）">
              <a-input-number
                :min="0"
                v-decorator="[
                  'km_price',
                  {
                    rules: [{ required: true, message: '请输入超出公里数单价（元）！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">
          搬入搬出（楼梯）收费标准
        </a-divider>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="多少楼层开始计费">
              <a-input-number
                :min="0"
                v-decorator="[
                  'floor_standard',
                  {
                    rules: [{ required: true, message: '请输入多少楼层开始计费！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="单价（元）（每楼层每车）">
              <a-input-number
                :min="0"
                v-decorator="[
                  'floor_price',
                  {
                    rules: [{ required: true, message: '请输入单价（元）（每楼层每车）！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">
          停车位距离收费标准（元）（每车）
        </a-divider>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="低于30米">
              <a-input-number
                :min="0"
                v-decorator="[
                  'distance1',
                  {
                    rules: [{ required: true, message: '请输入低于30米！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="30-50米">
              <a-input-number
                :min="0"
                v-decorator="[
                  'distance2',
                  {
                    rules: [{ required: true, message: '请输入30-50米！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="50-100米">
              <a-input-number
                :min="0"
                v-decorator="[
                  'distance3',
                  {
                    rules: [{ required: true, message: '请输入50-100米！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="100米以上或地下室出入">
              <a-input-number
                :min="0"
                v-decorator="[
                  'distance4',
                  {
                    rules: [{ required: true, message: '请输入100米以上或地下室出入！' }],
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
        this.form.setFieldsValue(
          pick(record, [
            'name',
            'load',
            'size',
            'volume',
            'price',
            'km_standard',
            'km_price',
            'floor_standard',
            'floor_price',
            'distance1',
            'distance2',
            'distance3',
            'distance4'
          ])
        )
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
