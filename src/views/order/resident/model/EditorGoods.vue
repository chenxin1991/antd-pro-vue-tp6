<!-- 居民搬家-编辑-物品  -->
<template>
  <div>
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 0 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 24 }
            }"
          >
            <a-button
              class="editable-add-btn"
              @click="handleGoodsAdd"
            >
              添加物品
            </a-button>
            <a-table
              :columns="columns_goods"
              :data-source="selectGoods"
              :pagination="false"
              size="small"
            >
              <template
                slot="id"
                slot-scope="text,record"
              >
                <a-select
                  show-search
                  :value="text"
                  placeholder="选择物品"
                  :filter-option="filterGoods"
                  @change="(value,option) => handleGoodsIDChange(value,record.key,option)"
                >
                  <a-select-option
                    :key="index"
                    v-for="(item, index) in goods"
                    :value="item.id"
                    :option="{'price':item.price,'name':item.name}"
                  >{{ item.name }}</a-select-option>
                </a-select>
              </template>
              <!-- 上传图片 -->
              <template
                slot="pictures"
              >
                <div class="clearfix picture-img">
                  <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="/index.php/admin/test/avatar"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                    @preview="handlePreview"
                  >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">
                        Upload
                      </div>
                    </div>
                  </a-upload>
                  <!-- <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
                      </a-upload> -->
                  <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel2">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </div>
              </template>

              <template
                slot="num"
                slot-scope="text,record"
              >
                <a-input-number
                  :value="text"
                  :min="1"
                  :max="10"
                  style="width:100%"
                  @change="value => handleGoodsNumChange(value, record.key)"
                />
              </template>
              <span
                slot="action"
                slot-scope="text, record"
              >
                <template>
                  <a-popconfirm
                    v-if="selectGoods.length"
                    title="确定删除吗?"
                    @confirm="() => handleGoodsDelete(record.key)"
                  >
                    <a href="javascript:;">删除</a>
                  </a-popconfirm>
                </template>
              </span>
            </a-table>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="物品费用">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ goodsCost }}元
            </span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { getGoods } from '@/api/common'
// 图片格式
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
name: 'EditorGoods',
  data () {
    return {
       labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
       columns_goods: [
        {
          title: '名称',
          dataIndex: 'id',
          width: '40%',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '单价',
          dataIndex: 'price',
          width: '15%'
        },
        {
          title: '数量',
          dataIndex: 'num',
          width: '15%',
          scopedSlots: { customRender: 'num' }
        },
         {
          title: '上传图片',
          dataIndex: 'pictures',
          scopedSlots: { customRender: 'pictures' }
        },
        {
          title: '总计',
          dataIndex: 'total'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      goods: [],
      selectGoods: [],
        goodsCount: 0,
          previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ],
      loading: false,
      imageUrl: ''
    }
  },

  components: {},

  computed: {},

  mounted: {},

  created () {
     getGoods({ t: new Date() }).then(res => {
      this.goods = res
    })
  },

  methods: {
        handleGoodsAdd () {
      const { selectGoods, goodsCount } = this
      const newData = {
        key: goodsCount,
        id: undefined,
        name: '',
        price: 0,
        num: 1,
        total: 0
      }
      this.selectGoods = [...selectGoods, newData]
      this.goodsCount = goodsCount + 1
    },
    handleGoodsIDChange (value, key, option) {
      const newData = [...this.selectGoods]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['id'] = value
        target['name'] = option.data.attrs.option.name
        target['price'] = option.data.attrs.option.price
        target['total'] = target['price'] * target['num']
        this.selectGoods = newData
      }
    },
    handleGoodsNumChange (value, key) {
      const newData = [...this.selectGoods]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['num'] = value
        target['total'] = target['num'] * target['price']
        this.selectGoods = newData
      }
    },
    handleGoodsDelete (key) {
      this.selectGoods = this.selectGoods.filter(item => item.key !== key)
    },
     // 上传图片
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
    // handleChange ({ fileList }) {
    //   this.fileList = fileList
    // },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
          console.log(this.imageUrl)
        })
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
    }
  }
}

</script>
<style lang='less' scoped>
</style>
