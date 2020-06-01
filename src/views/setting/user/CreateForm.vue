<template>
  <a-modal
    title="操作"
    :width="800"
    v-model="visible"
    @ok="handleOk"
  >
    <a-form class="permission-form" :form="form">

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="用户名"
      >
        <a-input
          v-decorator="['id', { rules: [{ required: true, message: '请输入用户名！' }] }]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="真实姓名"
      >
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请输入用户名！' }] }]"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="角色"
      >
        <a-select v-decorator="['status', { initialValue: 1 }]">
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <!--接入百度地图-->
      <!-- <baidu-map :center="{lng: 116.403765, lat: 39.914850}" :zoom="11">
        <bm-view class="map"></bm-view>
        <bm-control :offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1000000}" @confirm="test">
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
      </baidu-map> -->

    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

export default {
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

      form: this.$form.createForm(this),
            keyword: ''
    }
  },
  methods: {
    test (type, target, item) {
      console.log(type)
    },
    add () {
      this.visible = true
    },
    edit (record) {
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
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
.map {
  width: 100%;
  height: 400px;
}
</style>
