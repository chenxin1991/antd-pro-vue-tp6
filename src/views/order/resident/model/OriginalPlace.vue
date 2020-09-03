<!--  居民搬家-编辑-起始地  -->
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
              @click="handleRouteAdd"
            >
              添加途径点
            </a-button>
            <a-table
              :columns="columns_route"
              :data-source="route"
              :pagination="false"
              size="small"
            >
              <template
                slot="floor_num"
                slot-scope="text,record"
              >
                <a-input-number
                  :value="text"
                  :min="0"
                  :max="100"
                  style="width:100%"
                  @change="value => handleRouteChange(value, record.key,'floor_num')"
                />
              </template>
              <template
                slot="parking_distance"
                slot-scope="text, record"
              >
                <a-select
                  :value="text"
                  @change="value => handleRouteChange(value,record.key,'parking_distance')"
                  placeholder="选择距离"
                >
                  <a-select-option value="0">低于30米</a-select-option>
                  <a-select-option value="1">30-50米</a-select-option>
                  <a-select-option value="2">50-100米</a-select-option>
                  <a-select-option value="3">100米以上</a-select-option>
                  <a-select-option value="4">地下室出入</a-select-option>
                </a-select>
              </template>
              <template
                slot="location"
                slot-scope="text, record"
              >
                <a-auto-complete
                  :value="text"
                  :placeholder="record.placeholder"
                  :dropdown-match-select-width="false"
                  :dropdown-style="{ width: '800px'}"
                  @search="value=>onLocationSearch(value,record.key)"
                  @select="(value,option)=>onLocationSelect(value,option,record.key)"
                  @change="value=>onLocationChange(value,record.key)"
                  @blur="onLacationBlur(record.key)"
                  optionLabelProp="title"
                >
                  <template slot="dataSource">
                    <a-select-option
                      v-for="place in places"
                      :key="place.id"
                      :title="place.title"
                      :option="{'title':place.title,'location':place.location,'address':place.address}"
                    ><span style="font-weight:bold;">{{ place.title }}</span><span style="padding-left:10px;">{{ place.address }}</span></a-select-option>
                  </template>
                </a-auto-complete>
              </template>
              <template
                slot="room_number"
                slot-scope="text, record"
              >
                <a-input
                  :value="text"
                  @change="e => handleRouteChange(e.target.value, record.key, 'room_number')"
                >/>
                </a-input>
              </template>
              <template
                slot="stairs_or_elevators"
                slot-scope="text, record"
              >
                <a-select
                  :value="text"
                  placeholder="选择"
                  @change="value => handleRouteChange(value,record.key,'stairs_or_elevators')"
                >
                  <a-select-option value="0">电梯</a-select-option>
                  <a-select-option value="1">楼梯</a-select-option>
                </a-select>
              </template>
              <span
                slot="action"
                slot-scope="text, record"
              >
                <template>
                  <a-popconfirm
                    v-if="route.length && record.key!=0 && record.key!=1"
                    title="确定删除吗?"
                    @confirm="() => handleRouteDelete(record.key)"
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
          <a-form-item label="实际距离">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ distance || 0 }}公里
            </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="距离费用">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ distanceCost }}元
            </span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="楼层费用">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ floorCost }}元
            </span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="停车距离费用">
            <span
              class="ant-form-text"
              style="font-size:20px;color:red;"
            >
              {{ parkingCost }}元
            </span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>

import eventBus from '@/event/eventBus'
import { fetch, distance } from '@/event/originalPlace'

export default {
  name: 'OriginalPlace',
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
      columns_route: [
        {
          title: '地址',
          dataIndex: 'title',
          width: '37%',
          scopedSlots: { customRender: 'location' }
        },
        {
          title: '门牌号',
          dataIndex: 'room_number',
          width: '20%',
          scopedSlots: { customRender: 'room_number' }
        },
        {
          title: '电梯或楼梯',
          dataIndex: 'stairs_or_elevators',
          scopedSlots: { customRender: 'stairs_or_elevators' },
          width: '90px'
        },
        {
          title: '楼层数',
          dataIndex: 'floor_num',
          scopedSlots: { customRender: 'floor_num' },
          width: '80px'
        },
        {
          title: '停车位距离',
          dataIndex: 'parking_distance',
          scopedSlots: { customRender: 'parking_distance' },
          width: '120px'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      places: [],
      distance: this.formlist.distance,
      route: this.datas,
      routeCount: this.datas.length,
      selectCar: this.formlist.cars,
      setting: this.settingData
    }
  },

  components: {},

  computed: {
    // 距离费用
    distanceCost: function () {
      // console.log('this.selectCar', this.selectCar)
      // console.log('this.setting', this.setting)
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
    }
  },

  created () {
    // console.log(this.formlist.cars)
    console.log('this.settingData', this.settingData)
    eventBus.$on('addCar', message => {
      // 一些操作，message就是从top组件传过来的值
      this.selectCar = message
      // console.log('message', message)
      // console.log('this.selectCar', this.selectCar)
    })
    //  console.log('route', this.route)
    //  console.log(this.formlist.distance)
  },

  methods: {
    onLocationSearch (value, key) {
      if (value) {
        // console.log('value', value)
        fetch(value, data => (this.places = data))
      }
    },
    onLocationSelect (value, option, key) {
      let flag = true
      const data = option.data.attrs.option
      const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['title'] = data.title
        target['location'] = data.location
        target['address'] = data.address
        target['select_title'] = data.title
        this.route = newData
      }
      this.route.forEach(r => {
        if (!r.location) {
          flag = false
        }
      })
      if (flag) {
        distance(this.route, data => (this.distance = data))
      }
    },
    onLocationChange (value, key) {
      const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['title'] = value
        this.route = newData
      }
    },
    onLacationBlur (key) {
      const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        if (target['select_title'] !== target['title']) {
          target['title'] = target['select_title']
        }
        this.route = newData
      }
    },
    handleRouteChange (value, key, column) {
      const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.route = newData
      }
    },
    handleRouteAdd () {
      const { routeCount } = this
      const newData = {
        key: routeCount,
        title: '',
        address: '',
        location: '',
        room_number: '',
        stairs_or_elevators: '',
        floor_num: '',
        parking_distance: '',
        placeholder: '请输入途径点'
      }
      this.route.splice(-1, 0, newData)
      this.routeCount = routeCount + 1
    },
    handleRouteDelete (key) {
      let flag = true
      this.route = this.route.filter(item => item.key !== key)
      this.route.forEach(r => {
        if (!r.location) {
          flag = false
        }
      })
      if (flag) {
        distance(this.route, data => (this.distance = data))
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
