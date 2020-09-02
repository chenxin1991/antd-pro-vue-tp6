<!-- 居民搬家-编辑-预约与车辆 -->
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
              v-decorator="['source', { rules: [{ required: true, message: '请选择订单来源！' }] }]"
              placeholder="请选择"
            >
              <a-select-option value="0">来电</a-select-option>
              <a-select-option value="1">上门</a-select-option>
              <a-select-option value="2">小程序</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="客户名"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-input v-decorator="['customer',{ rules: [{ required: true, message: '请输入客户名！' }] }]" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="联系电话"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-input v-decorator="['phone',{ rules: [{ required: true, message: '请输入联系电话！' }] }]" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-model-item
            label="预约日期"
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 8 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 16 }
            }"
          >
            <a-date-picker
              v-decorator="[
                'appointment',
                {
                  rules: [{ required: true, message: '请选择预约日期！' }],
                },
              ]"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item
            label="时间段"
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
              v-decorator="['time', { rules: [{ required: true, message: '请选择时间段！' }] }]"
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
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-model-item
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
              @click="handleCarAdd"
            >
              添加车辆
            </a-button>
            <a-table
              :columns="columns_car"
              :data-source="selectCar"
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
                  placeholder="选择车辆"
                  :filter-option="filterGoods"
                  @change="(value,option) => handleCarIDChange(value,record.key,option)"
                >
                  <a-select-option
                    :key="index"
                    v-for="(item, index) in car"
                    :value="item.id"
                    :option="{'price':item.price,'item':item}"
                  >{{ item.name }}</a-select-option>
                </a-select>
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
                  @change="value => handleCarNumChange(value, record.key)"
                />
              </template>
              <span
                slot="action"
                slot-scope="text, record"
              >
                <template>
                  <a-popconfirm
                    v-if="selectCar.length"
                    title="确定删除吗?"
                    @confirm="() => handleCarDelete(record.key)"
                  >
                    <a href="javascript:;">删除</a>
                  </a-popconfirm>
                </template>
              </span>
            </a-table>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="车辆费用">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ carCost }}元
            </span>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item
            :labelCol="{
              xs: { span: 24 },
              sm: { span: 12 }
            }"
            :wrapperCol="{
              xs: { span: 24 },
              sm: { span: 12 }
            }"
            label="特殊时间段费用"
          >
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ specialTimeCost }}元
            </span>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { getCars } from '@/api/common'
import pick from 'lodash.pick'
import moment from 'moment'
import eventBus from '@/event/eventBus'
// import { filterGoods } from '@/event/filter'
export default {
name: 'ReserveVehicle',
props: {
    datas: {
      type: Array,
       default: function () {
         return { datas: {} }
       }
    },
    formlist: {
      type: Object,
       default: function () {
         return { formlist: {} }
       }
    },
     settingData: {
      type: Object,
       default: function () {
         return { settingData: {} }
       }
    }
  },
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
         columns_car: [
        {
          title: '车型',
          dataIndex: 'id',
          width: '40%',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '数量',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
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
      time: '',
      car: [],
      selectCar: this.datas,
      carCount: this.datas.length,
      ModifyForm: '',
       setting: this.settingData
    }
  },

  components: {},

  computed: {
        specialTimeCost: function () {
      let cost = 0
      if (this.time) {
        if (this.time >= '19:00' && this.time <= '23:00') {
          cost = (
            (this.setting.add_ratio1 / 100) *
            (this.carCost + this.distanceCost + this.floorCost + this.parkingCost + this.goodsCost)
          )
        } else if (this.time > '23:00' || this.time <= '07:00') {
          cost = (
            (this.setting.add_ratio2 / 100) *
            (this.carCost + this.distanceCost + this.floorCost + this.parkingCost + this.goodsCost)
          )
        }
      }
      return Math.round(cost)
    },
     carCost: function () {
      let cost = 0
      this.selectCar.forEach(r => {
        if (r.id > 0) {
          cost = cost + r.total
        }
      })
      return Math.round(cost)
    }
  },

  created () {
    // console.log(999999, this.datas)
    // console.log('formlist', this.formlist)

    getCars({ t: new Date() }).then(res => {
      this.car = res
    })
  },
mounted () {
//  this.getData()
},
updated () {

},
beforeUpdate () {
  this.getData()
},
  methods: {
    filterGoods (input, option) {
  return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
},

     getData () {
      //  console.log(1111, this.formlist)
       const obj = {
         source: this.formlist.source,
         customer: this.formlist.customer,
         phone: this.formlist.phone,
         time: this.formlist.time
       }
      //  const { source, customer, phone, time } = this.formlist
       console.log('obj', obj)
      //  this.form = obj
       const {
        form: { setFieldsValue }
      } = this
        this.$nextTick(() => {
  // this.form.setFieldsValue(pick(this.formlist, 'source', 'customer', 'phone', 'time'))
       const formData = pick(obj, 'source', 'customer', 'phone', 'time')
      console.log(333333334)
        formData.appointment = moment(this.formlist.appointment)
        setFieldsValue(formData)
        // this.time = this.formlist.time
        })
      },
      handleCarAdd () {
      const { selectCar, carCount } = this
      const newData = {
        key: carCount,
        id: undefined,
        name: '',
        price: 0,
        num: 1,
        total: 0,
        km_price: 0,
        floor_standard: 0,
        floor_price: 0,
        distance1: 0,
        distance2: 0,
        distance3: 0,
        distance4: 0
      }
      this.selectCar = [...selectCar, newData]
      console.log(this.selectCar)
      eventBus.$emit('addCar', this.selectCar)
      this.carCount = carCount + 1
    },
    handleCarIDChange (value, key, option) {
      const newData = [...this.selectCar]
      const target = newData.filter(item => key === item.key)[0]
      const item = option.data.attrs.option.item
      if (target) {
        target['id'] = value
        target['name'] = item.name
        target['price'] = item.price
        target['km_price'] = item.km_price
        target['km_standard'] = item.km_standard
        target['floor_price'] = item.floor_price
        target['floor_standard'] = item.floor_standard
        target['distance1'] = item.distance1
        target['distance2'] = item.distance2
        target['distance3'] = item.distance3
        target['distance4'] = item.distance4
        target['total'] = target['price'] * target['num']
        this.selectCar = newData
      }
    },
    handleCarNumChange (value, key) {
      const newData = [...this.selectCar]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['num'] = value
        target['total'] = target['num'] * target['price']
        this.selectCar = newData
      }
    },
    handleCarDelete (key) {
      this.selectCar = this.selectCar.filter(item => item.key !== key)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
