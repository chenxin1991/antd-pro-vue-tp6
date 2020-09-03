<!-- 居民搬家-编辑-预约-->
<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-model-item
            label="订单来源"
            prop="source"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-select :default-value="sourceData[0]" @change="changeSource">
              <a-select-option v-for="item in sourceData" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="客户名"
            prop="customer"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-input
              v-model="form.customer"
              placeholder="请输入客户名"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="联系电话"
            prop="phone"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-input
              v-model="form.phone"
              placeholder="请输入联系电话"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-model-item
            label="预约日期"
            prop="appointment"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-date-picker :defaultValue="moment(form.appointment, 'YYYY-MM-DD')" @change="onChange" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="时间段"
            prop="time"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-select
              v-model="form.time"
              placeholder="请选择时间段"
              @change="value=>this.time=value"
            >
              <a-select-option
                v-for="t in times"
                :key="t"
                :value="t"
              >{{ t }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
export default {
  name: 'Reservation',
  props: {
    formlist: {
      type: Object,
      default: function () {
        return { formlist: {} }
      }
    }
  },
  data () {
    return {
      moment,
   labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      times: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00'
      ],
      time: '12:00',
      sourceData: ['来电', '上门', '小程序'],
      form: {
        source: '',
        customer: '',
        phone: '',
        appointment: '',
        time: ''
      },
      rules: {
        source: [{ required: true, message: '请选择订单来源', trigger: 'change' }],
        customer: [{ required: true, message: '请输入客户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        appointment: [{ required: true, message: '请选择预约日期', trigger: 'change' }],
        time: [{ required: true, message: '请选择时间段', trigger: 'change' }]
      }
    }
  },

  components: {},

  computed: {},

  created () {
    this.getData()
    // console.log('88888888', this.formlist)
  },
  mounted () {
  },
  updated () {},
  beforeUpdate () {

  },
  methods: {
    getData () {
      this.form = this.formlist
      //  this.form.source = this.formlist.source
      //   this.form.customer = this.formlist.customer
      //    this.form.phone = this.formlist.phone
      //     this.form.appointment = this.formlist.appointment
      //     this.form.time = this.formlist.time
    },
    changeSource (value) {
       console.log(value)
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
