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
        <a-form-item label="分类">
          <a-select
            v-decorator="['cid', { rules: [{ required: true, message: '请选择分类！' }] }]"
            placeholder="请选择"
          >
            <a-select-option
              :key="index"
              v-for="(item, index) in params.category"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="上传图片">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/admin/test/avatar"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="image_url" :src="image_url" alt="avatar" style="max-width:202px;max-height:202px;"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addGoods, editGoods } from '@/api/basic/goods'
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
      form: this.$form.createForm(this),
      loading: false,
      image_url: ''
    }
  },
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增物品'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.image_url = ''
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑物品'
      this.config.id = record.id
      this.image_url = record.image_url
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['name', 'price', 'cid']))
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
            addGoods(values)
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
            editGoods(values)
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
.avatar-uploader /deep/ .ant-upload {
  width: 220px;
  height: 220px;
}
</style>
