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
        <a-form-item label="排序">
          <a-input-number
            v-decorator="['sort', { rules: [{ required: true, message: '请输入排序！' }] }]"
            style="width:100%;"
          />
        </a-form-item>
        <a-form-item label="上传图片">
          <a-upload
            name="avatar"
            action="/index.php/admin/test/avatar"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel2"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addGoods, editGoods } from '@/api/basic/goods'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
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
      previewVisible: false,
      previewImage: '',
      fileList: [],
      imageList: []
    }
  },
  methods: {
    add () {
      this.config.action = 'add'
      this.config.title = '新增物品'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.fileList = []
      })
    },
    edit (record) {
      this.config.action = 'edit'
      this.config.title = '编辑物品'
      this.config.id = record.id
      if (record.image_url === '' || record.image_url === null) {
        this.fileList = []
      } else {
      this.fileList = record.image_url
      }
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['name', 'price', 'cid', 'sort']))
      })
    },
    handleCancel2 () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange (info) {
      const file = info.file
      const fileList = info.fileList
      const len = fileList.length
      if (file.status === 'done') {
        fileList[len - 1] = { uid: file.uid, name: file.name, url: file.response.url, status: 'done' }
      }
      if (file.status === 'error') {
                fileList[len - 1] = { uid: file.uid, name: file.name, status: 'error' }
      }
      this.fileList = fileList
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      const { $message } = this
      validateFields((errors, values) => {
        values.image_url = this.fileList
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
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
