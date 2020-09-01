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
          tab="预约与车辆"
          forceRender
        >
          <ReserveVehicle></ReserveVehicle>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="起始地"
          forceRender
        >
          <OriginalPlace></OriginalPlace>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="物品"
          forceRender
        >
          <EditorGoods></EditorGoods>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </a-modal>
</template>
<script>
import ReserveVehicle from './model/ReserveVehicle.vue'
import OriginalPlace from './model/OriginalPlace.vue'
import EditorGoods from './model/EditorGoods.vue'

import pick from 'lodash.pick'
import moment from 'moment'

import { addResidentOrder, editResidentOrder } from '@/api/order/resident'
import { getSetting } from '@/api/common'

export default {
  name: 'ResidentForm',
   components: {
     ReserveVehicle,
     OriginalPlace,
     EditorGoods
   },
  data () {
    return {
      config: {},
      setting: {}
    }
  },
  created () {
    getSetting({ id: 1 }).then(res => {
      this.setting = res
    })
  },
  computed: {
    carCost: function () {
      let cost = 0
      this.selectCar.forEach(r => {
        if (r.id > 0) {
          cost = cost + r.total
        }
      })
      return Math.round(cost)
    },
    distanceCost: function () {
      const that = this
      let cost = 0
      this.selectCar.forEach(r => {
        if (r.id > 0) {
          if (that.distance > r.km_standard && that.distance <= 300) {
            cost = cost + r.km_price * (that.distance - r.km_standard) * r.num
          } else if (that.distance > 300 && that.distance <= 500) {
            cost = cost + (r.km_price * (that.distance - r.km_standard) * r.num * that.setting.discount1) / 10
          } else if (that.distance > 500) {
            cost = cost + (r.km_price * (that.distance - r.km_standard) * r.num * that.setting.discount2) / 10
          }
        }
      })
      return Math.round(cost)
    },
    floorCost: function () {
      let cost = 0
      const floors = []
      this.route.forEach(r => {
        if (r.location && r.floor_num > 0 && r.stairs_or_elevators === '1') {
          floors.push(r.floor_num)
        }
      })
      if (floors.length > 0) {
        this.selectCar.forEach(s => {
          if (s.id > 0) {
            for (let i = 0; i < floors.length; i++) {
              if (s.floor_standard <= floors[i]) {
                cost = cost + (floors[i] - s.floor_standard + 1) * s.floor_price * s.num
              }
            }
          }
        })
      }
      return Math.round(cost)
    },
    parkingCost: function () {
      let cost = 0
      const parking = []
      this.route.forEach(r => {
        if (r.location && r.parking_distance >= 0) {
          parking.push(r.parking_distance)
        }
      })
      if (parking.length > 0) {
        this.selectCar.forEach(s => {
          if (s.id > 0) {
            for (let i = 0; i < parking.length; i++) {
              switch (parking[i]) {
                // 低于30米
                case '0':
                  cost = cost + s.distance1 * s.num
                  break
                // 30-50米
                case '1':
                  cost = cost + s.distance2 * s.num
                  break
                // 50-100米
                case '2':
                  cost = cost + s.distance3 * s.num
                  break
                // 100米以上或地下室出入
                case '3':
                case '4':
                  cost = cost + s.distance4 * s.num
                  break
              }
            }
          }
        })
      }
      return Math.round(cost)
    },
    goodsCost: function () {
      let cost = 0
      this.selectGoods.forEach(r => {
        if (r.id > 0) {
          cost = cost + r.total
        }
      })
      return Math.round(cost)
    },
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
    moment,
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
      this.config.action = 'edit'
      this.config.title = '修改订单'
      this.config.id = record.id
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        const formData = pick(record, ['source', 'customer', 'phone', 'time'])
        formData.appointment = moment(record.appointment)
        setFieldsValue(formData)
        this.time = record.time
        this.selectCar = JSON.parse(JSON.stringify(record.cars))
        this.carCount = record.cars.length
        this.route = JSON.parse(JSON.stringify(record.routes))
        this.routeCount = record.routes.length
        this.distance = record.distance
        this.selectGoods = JSON.parse(JSON.stringify(record.goods))
        this.goodsCount = record.goods.length
      })
    },

    filterGoods (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        if (!errors) {
          values.appointment = values.appointment.format('YYYY-MM-DD')
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
