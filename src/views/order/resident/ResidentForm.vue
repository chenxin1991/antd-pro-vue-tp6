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
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item
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
                  <a-select-option value="1">来电</a-select-option>
                  <a-select-option value="2">上门</a-select-option>
                  <a-select-option value="3">小程序</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
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
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
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
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item
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
                    'appointDate',
                    {
                      rules: [{ required: true, message: '请选择预约日期！' }],
                    },
                  ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
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
                  v-decorator="['appointTime', { rules: [{ required: true, message: '请选择时间段！' }] }]"
                  placeholder="请选择时间段"
                  @change="value=>this.appointTime=value"
                >
                  <a-select-option
                    v-for="t in times"
                    :key="t"
                    :value="t"
                  >{{ t }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
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
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="车辆费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  {{ carCost }}元
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
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
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="起始地"
          forceRender
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
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="物品"
          forceRender
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
                  <template
                    slot="image"
                    slot-scope="text,record"
                  >
                    <a-upload
                      name="avatar"
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="false"
                      action="/index.php/admin/test/avatar"
                      :before-upload="beforeUpload"
                      @change="info => handleImageChange(info,record.key)"
                    >
                      <img
                        v-if="text"
                        :src="text"
                        alt="avatar"
                        style="max-width:80px;max-height:80px;"
                      />
                      <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                          Upload
                        </div>
                      </div>
                    </a-upload>
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
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </a-modal>
</template>
<script>
import pick from 'lodash.pick'
import moment from 'moment'
import jsonp from 'fetch-jsonp'
import { addResidentOrder, editResidentOrder } from '@/api/order/resident'
import { getCars, getGoods, getSetting } from '@/api/common'

let timeout

function fetch (value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

  function fake () {
    jsonp(
      'https://apis.map.qq.com/ws/place/v1/suggestion/?region=深圳&region_fix=0&output=jsonp&keyword=' +
        value +
        '&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ'
    )
      .then((response) => response.json())
      .then((d) => {
        const result = d.data
        const data = []
        result.forEach((r) => {
          if (!r.address.includes(r.province)) {
            if (r.address.hasOwnProperty('district')) {
              r.address = r.province + r.city + r.district + r.address
            } else {
              r.address = r.province + r.city + r.address
            }
          }
          data.push({
            id: r.id,
            title: r.title,
            province: r.province,
            city: r.city,
            district: r.district,
            location: JSON.stringify(r.location),
            address: r.address
          })
        })
        callback(data)
      })
  }

  timeout = setTimeout(fake, 300)
}

function distance (value, callback) {
  let from = ''
  let to = ''
  let waypoints = ''
  let url = ''
  let distance = 0
  value.forEach((r) => {
    if (r.key === 0) {
      from = r.location.lat + ',' + r.location.lng
    } else if (r.key === 1) {
      to = r.location.lat + ',' + r.location.lng
    } else {
      if (waypoints) {
        waypoints = waypoints + ';' + r.location.lat + ',' + r.location.lng
      } else {
        waypoints = r.location.lat + ',' + r.location.lng
      }
    }
  })

  if (from && to) {
    url =
      'https://apis.map.qq.com/ws/direction/v1/driving/?from=' +
      from +
      '&to=' +
      to +
      '&output=jsonp&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ'
    if (waypoints) {
      url = url + '&waypoints=' + waypoints
    }
    jsonp(url)
      .then((response) => response.json())
      .then((d) => {
        if (d.status === 0) {
          const route = d.result.routes[0]
          distance = Math.round(route.distance / 1000)
          callback(distance)
        } else {
          callback(distance)
        }
      })
      .catch((err) => {
        console.log(err)
        callback(distance)
      })
  }
}

export default {
  data () {
    return {
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
          title: '总计',
          dataIndex: 'total'
        },
        {
          title: '图片',
          dataIndex: 'image_url',
          scopedSlots: { customRender: 'image' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
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
      config: {},
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
      appointTime: '',
      car: [],
      selectCar: [],
      places: [],
      distance: 0,
      route: [
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
          placeholder: '请输入起点'
        }
      ],
      goods: [],
      selectGoods: [],
      carCount: 0,
      routeCount: 2,
      goodsCount: 0,
      setting: {},
      loading: false
    }
  },
  created () {
    getCars({ t: new Date() }).then((res) => {
      this.car = res
    })
    getGoods({ t: new Date() }).then((res) => {
      this.goods = res
    })
    getSetting({ t: new Date() }).then((res) => {
      this.setting = res
    })
  },
  computed: {
    carCost: function () {
      let cost = 0
      this.selectCar.forEach((r) => {
        if (r.id > 0) {
          cost = cost + r.total
        }
      })
      return Math.round(cost)
    },
    distanceCost: function () {
      const that = this
      let cost = 0
      this.selectCar.forEach((r) => {
        if (r.id > 0) {
          if (that.distance > parseFloat(r.km_standard) && that.distance <= 300) {
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
      this.route.forEach((r) => {
        if (r.location && r.floor_num > 0 && r.stairs_or_elevators === '1') {
          floors.push(r.floor_num)
        }
      })
      if (floors.length > 0) {
        this.selectCar.forEach((s) => {
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
      this.route.forEach((r) => {
        if (r.location && r.parking_distance >= 0) {
          parking.push(r.parking_distance)
        }
      })
      if (parking.length > 0) {
        this.selectCar.forEach((s) => {
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
      this.selectGoods.forEach((r) => {
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
          cost =
            (this.setting.add_ratio1 / 100) *
            (this.carCost + this.distanceCost + this.floorCost + this.parkingCost + this.goodsCost)
        } else if (this.time > '23:00' || this.time <= '07:00') {
          cost =
            (this.setting.add_ratio2 / 100) *
            (this.carCost + this.distanceCost + this.floorCost + this.parkingCost + this.goodsCost)
        }
      }
      return Math.round(cost)
    },
    totalCost: function () {
      return (
        this.carCost + this.distanceCost + this.floorCost + this.parkingCost + this.goodsCost + this.specialTimeCost
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
        const formData = pick(record, ['source', 'customer', 'phone', 'appointTime'])
        formData.source = formData.source.toString()
        formData.appointDate = moment(record.appointDate)
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
      this.carCount = carCount + 1
    },
    handleCarIDChange (value, key, option) {
      const newData = [...this.selectCar]
      const target = newData.filter((item) => key === item.key)[0]
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
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['num'] = value
        target['total'] = target['num'] * target['price']
        this.selectCar = newData
      }
    },
    handleCarDelete (key) {
      this.selectCar = this.selectCar.filter((item) => item.key !== key)
    },
    onLocationSearch (value, key) {
      if (value) {
        fetch(value, (data) => (this.places = data))
      }
    },
    onLocationSelect (value, option, key) {
      let flag = true
      const data = option.data.attrs.option
      const newData = [...this.route]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['title'] = data.title
        target['location'] = JSON.parse(data.location)
        target['address'] = data.address
        target['select_title'] = data.title
        this.route = newData
      }
      this.route.forEach((r) => {
        if (!r.location) {
          flag = false
        }
      })
      if (flag) {
        distance(this.route, (data) => (this.distance = data))
      }
    },
    onLocationChange (value, key) {
      const newData = [...this.route]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['title'] = value
        this.route = newData
      }
    },
    onLacationBlur (key) {
      const newData = [...this.route]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        if (target['select_title'] !== target['title']) {
          target['title'] = target['select_title']
        }
        this.route = newData
      }
    },
    handleRouteChange (value, key, column) {
      const newData = [...this.route]
      const target = newData.filter((item) => key === item.key)[0]
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
      this.route = this.route.filter((item) => item.key !== key)
      this.route.forEach((r) => {
        if (!r.location) {
          flag = false
        }
      })
      if (flag) {
        distance(this.route, (data) => (this.distance = data))
      }
    },
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
      const target = newData.filter((item) => key === item.key)[0]
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
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['num'] = value
        target['total'] = target['num'] * target['price']
        this.selectGoods = newData
      }
    },
    handleImageChange (info, key) {
      if (info.file.status === 'done' && info.file.response.status === 'done') {
        const newData = [...this.selectGoods]
        const target = newData.filter((item) => key === item.key)[0]
        if (target) {
          target['image_url'] = info.file.response.url
          this.selectGoods = newData
        }
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
    handleGoodsDelete (key) {
      this.selectGoods = this.selectGoods.filter((item) => item.key !== key)
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
          values.appointDate = values.appointDate.format('YYYY-MM-DD')
          const cars = []
          let carFlag = true
          this.selectCar.forEach((r) => {
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
          this.route.forEach((r) => {
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
          this.selectGoods.forEach((r) => {
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
            editResidentOrder(values)
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
          // this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editable-add-btn {
  margin-bottom: 8px;
}
.ant-form-item {
  margin-bottom: 12px;
}
.ant-upload.ant-upload-select-picture-card {
  width: 80px;
  height: 80px;
  margin-right: 0px;
  margin-bottom: 0px;
}
.ant-upload-picture-card-wrapper {
  zoom: 1;
  width: 100%;
  display: block;
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0px;
}
</style>
