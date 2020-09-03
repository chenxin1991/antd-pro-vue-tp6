<template>
  <a-modal
    :title="config.title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :bodyStyle="{padding:'24px 24px 12px 24px'}"
  >
    <template slot="footer">
      <h2 style="dispaly:inline;float:left;color:red;">总报价：{{ totalCost }}元</h2>
      <a-button
        key="back"
        @click="handleCancel"
      >
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="confirmLoading"
        @click="handleSubmit"
      >
        确定
      </a-button>
    </template>
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-tabs
        default-active-key="1"
        tabPosition="left"
      >
        <a-tab-pane
          key="1"
          tab="预约和车辆"
          forceRender
        >
          <Reservation :formlist="ModifyData" ></Reservation>
          <Vehicle :datas="carsData" :formlist="ModifyData" :settingData="setting" ></Vehicle>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="起始地"
          forceRender
        >
          <OriginalPlace :datas="PlaceData" :formlist="ModifyData"></OriginalPlace>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="物品"
          forceRender
        >
          <Goods :datas="GoodsData" :settingData="setting"></Goods>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </a-modal>
</template>
<script>
import Reservation from './model/Reservation.vue'
import Vehicle from './model/Vehicle.vue'
import OriginalPlace from './model/OriginalPlace.vue'
import Goods from './model/Goods.vue'

import { addResidentOrder, editResidentOrder } from '@/api/order/resident'
import { getSetting } from '@/api/common'

export default {
  name: 'ResidentForm',
   components: {
    Reservation,
     Vehicle,
     OriginalPlace,
     Goods
   },
  data () {
    return {
      config: {},
      setting: {},
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      ModifyData: '', // 编辑全部数据
      carsData: '', // 预约和车辆
      PlaceData: '', // 起始地
      GoodsData: '' // 物品

    }
  },
  created () {
   this.getSett()
  },
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
    totalCost: function () {
      return (
        this.carCost +
        this.distanceCost +
        this.floorCost +
        this.parkingCost +
        this.goodsCost +
        this.specialTimeCost
      )
    }
  },
  methods: {
  getSett () {
    const _this = this
     getSetting({ id: 1 }).then(res => {
      _this.setting = res

       console.log(' this.setting', _this.setting)
    })
  },
    add () {
      this.config.action = 'add'
      this.config.title = '新增订单'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.selectCar = []
        this.route = [
          {
            key: 0,
            title: '',
            address: '',
            location: '',
            room_number: '',
            stairs_or_elevators: undefined,
            floor_num: '',
            parking_distance: undefined,
            placeholder: '请输入起点'
          },
          {
            key: 1,
            title: '',
            address: '',
            location: '',
            room_number: '',
            stairs_or_elevators: undefined,
            floor_num: '',
            parking_distance: undefined,
            placeholder: '请输入终点'
          }
        ]
        this.selectGoods = []
        this.distance = 0
        this.time = ''
      })
    },
    edit (record) {
        // console.log('record', record)
    this.ModifyData = JSON.parse(JSON.stringify(record))
    this.carsData = JSON.parse(JSON.stringify(record.cars))
    this.PlaceData = JSON.parse(JSON.stringify(record.routes))
    this.GoodsData = JSON.parse(JSON.stringify(record.larges))

    // console.log('this.ModifyData', this.ModifyData)
      this.config.action = 'edit'
      this.config.title = '修改订单'
      this.config.id = record.id
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleSubmit () {
      const {
        form: { validateFields },
        $message
      } = this
      // this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          const cars = []
          let carFlag = true
          this.selectCar.forEach(r => {
            if (r.key >= 0 && r.id > 0 && r.num > 0) {
              cars.push(r)
            } else {
              carFlag = false
            }
          })
          if (!cars.length || !carFlag) {
            $message.error('请检查车辆信息是否填写完整!')
            return false
          }
          values.cars = cars
          const routes = []
          let routeFlag = true
          this.route.forEach(r => {
            if (
              r.key >= 0 &&
              r.location &&
              r.room_number &&
              r.title &&
              r.address &&
              r.floor_num &&
              r.parking_distance &&
              r.stairs_or_elevators
            ) {
              routes.push(r)
            } else {
              routeFlag = false
            }
          })
          if (!routes.length || !routeFlag) {
            $message.error('请检查路线信息是否填写完整!')
            return false
          }
          values.routes = routes
          const goods = []
          let goodsFlag = true
          this.selectGoods.forEach(r => {
            if (r.key >= 0 && r.id && r.name && r.num > 0) {
              goods.push(r)
            } else {
              goodsFlag = false
            }
          })
          if (!goodsFlag) {
            $message.error('请检查拆装信息是否填写完整!')
            return false
          }

          values.goods = goods
          values.distance = this.distance
          values.carCost = this.carCost
          values.distanceCost = this.distanceCost
          values.floorCost = this.floorCost
          values.parkingCost = this.parkingCost
          values.goodsCost = this.goodsCost
          values.specialTimeCost = this.specialTimeCost
          values.totalCost = this.totalCost
          if (this.config.action === 'add') {
            addResidentOrder(values)
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
            editResidentOrder(values)
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
          // this.confirmLoading = false
        }
      })
    }

  }
}
</script>

<style>
.editable-add-btn {
  margin-bottom: 8px;
}
.ant-form-item {
  margin-bottom: 12px;
}

.ant-upload-select-picture-card i {
  font-size: 27px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 3px;
  color: #666;
}

.avatar-uploader > .ant-upload {
    width: 80px;
    height: 80px;
}
.picture-img{
  width: 80px;
    height: 80px;
}
</style>
