<template>
  <a-modal
    :title="config.title"
    :width="720"
    style="top: 40px;"
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
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="名称"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入名称！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="单价（元）"
            >
              <a-input-number
                :min="0"
                v-decorator="[
                  'price',
                  {
                    rules: [{ required: true, message: '请输入单价（元）！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="载重"
            >
              <a-input
                :min="0"
                v-decorator="[
                  'loadSize',
                  {
                    rules: [{ required: true, message: '请输入载重！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="长宽高"
            >
              <a-input
                :min="0"
                v-decorator="[
                  'lwh',
                  {
                    rules: [{ required: true, message: '请输入长宽高！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="体积"
            >
              <a-input
                :min="0"
                v-decorator="[
                  'volume',
                  {
                    rules: [{ required: true, message: '请输入载重！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="配备工人"
            >
              <a-input
                :min="0"
                v-decorator="[
                  'manning',
                  {
                    rules: [{ required: true, message: '请输入配备工人！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              label="上传图片"
            >
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="/index.php/admin/test/avatar"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img
                  v-if="image_url"
                  :src="image_url"
                  alt="avatar"
                  style="max-width:142px;max-height:142px;"
                />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">
          超出公里数收费标准
        </a-divider>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="超出多少公里开始计费">
              <a-input-number
                :min="0"
                v-decorator="[
                  'km_standard',
                  {
                    rules: [{ required: true, message: '请输入超出多少公里开始计费！' }],
                  },
                ]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
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
        sm: { span: 16 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      visible: false,
      confirmLoading: false,
      config: {},
      form: this.$form.createForm(this),
      loading: false,
      image_url: ''
    }
  },
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增车型'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.image_url = ''
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑车型'
      this.config.id = record.id
      this.visible = true
      this.image_url = record.image_url
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(record, [
            'name',
            'price',
            'loadSize',
            'lwh',
            'volume',
            'manning',
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
    handleChange (info) {
      if (info.file.status === 'done' && info.file.response.status === 'done') {
        this.image_url = info.file.response.url
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      const { $message } = this
      validateFields((errors, values) => {
        values.image_url = this.image_url
        if (!errors) {
          if (this.config.action === 'add') {
            addCar(values)
              .then((res) => {
                $message.success('添加成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              })
              .catch((err) => {
                $message.error(`load user err: ${err.message}`)
              })
          } else if (this.config.action === 'edit') {
            values.id = this.config.id
            editCar(values)
              .then((res) => {
                $message.success('修改成功')
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
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

<style lang="less" scoped>
.avatar-uploader /deep/ .ant-upload {
  width: 160px;
  height: 160px;
}
.ant-form-item {
  margin-bottom: 12px;
}
</style>
