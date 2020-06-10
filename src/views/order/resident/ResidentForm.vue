<template>
  <a-modal
    title="新增订单"
    :width="1000"
    :visible="visible"
    :bodyStyle="{padding:'24px 24px 12px 24px'}"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
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
                  <a-select-option value="0">来电</a-select-option>
                  <a-select-option value="1">上门</a-select-option>
                  <a-select-option value="2">小程序</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
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
                    'appointment',
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
                  v-decorator="['time', { rules: [{ required: true, message: '请选择时间段！' }] }]"
                  placeholder="请选择时间段"
                >
                  <a-select-option value="0">07:00</a-select-option>
                  <a-select-option value="1">08:00</a-select-option>
                  <a-select-option value="2">09:00</a-select-option>
                  <a-select-option value="3">10:00</a-select-option>
                  <a-select-option value="4">11:00</a-select-option>
                  <a-select-option value="5">12:00</a-select-option>
                  <a-select-option value="6">13:00</a-select-option>
                  <a-select-option value="7">14:00</a-select-option>
                  <a-select-option value="8">15:00</a-select-option>
                  <a-select-option value="9">16:00</a-select-option>
                  <a-select-option value="10">17:00</a-select-option>
                  <a-select-option value="11">18:00</a-select-option>
                  <a-select-option value="12">19:00</a-select-option>
                  <a-select-option value="13">20:00</a-select-option>
                  <a-select-option value="14">21:00</a-select-option>
                  <a-select-option value="15">22:00</a-select-option>
                  <a-select-option value="16">23:00</a-select-option>
                  <a-select-option value="17">00:00</a-select-option>
                  <a-select-option value="18">01:00</a-select-option>
                  <a-select-option value="19">02:00</a-select-option>
                  <a-select-option value="20">03:00</a-select-option>
                  <a-select-option value="21">04:00</a-select-option>
                  <a-select-option value="22">05:00</a-select-option>
                  <a-select-option value="23">06:00</a-select-option>
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
                <a-table
                  :columns="columns_car"
                  :data-source="cars"
                  :pagination="false"
                  size="small"
                >
                  <template
                    slot="num"
                    slot-scope="text, record"
                  >
                    <a-input-number
                      :min="0"
                      :max="10"
                      :value="text"
                      style="width:100%"
                      @change="value => handleCarNumChange(value, record.key)"
                    />
                  </template>
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
                  1200元
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
                    slot-scope="text, record"
                  >
                    <a-input-number
                      :min="0"
                      :max="10"
                      style="width:100%"
                      v-decorator="[`floor_num[${record.key}]`, { rules: [{ required: true, message: '请输入楼层数！' }] }]"
                    />
                  </template>
                  <template
                    slot="parking_distance"
                    slot-scope="text, record"
                  >
                    <a-select
                      v-decorator="[`parking_distance[${record.key}]`, { rules: [{ required: true, message: '请选择停车位距离！' }] }]"
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
                    <a-select
                      show-search
                      :value="text"
                      placeholder="input search text"
                      :default-active-first-option="false"
                      :show-arrow="false"
                      :filter-option="false"
                      :not-found-content="null"
                      @search="handleRouteLocationSearch"
                      @change="value => handleRouteLocationChange(value, record.key)"
                    >
                      <a-select-option v-for="d in data" :key="d.value">
                        <p>{{ d.text }}</p>
                        <p>{{ d.text }}</p>
                      </a-select-option>
                    </a-select>
                  </template>
                  <template
                    slot="room_number"
                    slot-scope="text, record"
                  >
                    <a-input
                      :value="text"
                      @change="e => handleRouteInputChange(e.target.value, record.key, 'room_number')"
                    >/>
                    </a-input>
                  </template>
                  <template
                    slot="stairs_or_elevators"
                    slot-scope="text, record"
                  >
                    <a-select
                      v-decorator="[`stairs_or_elevators[${record.key}]`, { rules: [{ required: true, message: '请选择电梯或楼梯！' }] }]"
                      placeholder="选择"
                    >
                      <a-select-option value="elevators">电梯</a-select-option>
                      <a-select-option value="stairs">楼梯</a-select-option>
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
                  10.6km
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="距离费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="拆装件"
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
                  @click="handleOnoffAdd"
                >
                  添加拆装件
                </a-button>
                <a-table
                  :columns="columns_onoff"
                  :data-source="onoff"
                  :pagination="false"
                  size="small"
                >
                  <template
                    slot="name"
                    slot-scope="text, record"
                  >
                    <a-select
                      show-search
                      v-decorator="[`name[${record.key}]`, { rules: [{ required: true, message: '请选择拆装件！' }] }]"
                      placeholder="选择拆装件"
                    >
                      <a-select-option value="elevators">2-3门或推拉门衣柜/书柜</a-select-option>
                      <a-select-option value="stairs">楼梯</a-select-option>
                    </a-select>
                  </template>
                  <template
                    slot="num"
                    slot-scope="text, record"
                  >
                    <a-input-number
                      :min="1"
                      :max="10"
                      v-decorator="[`num[${record.key}]`, { rules: [{ required: true, message: '请输入数量！' }]}]"
                      style="width:100%"
                    />
                  </template>
                  <span
                    slot="action"
                    slot-scope="text, record"
                  >
                    <template>
                      <a-popconfirm
                        v-if="onoff.length"
                        title="确定删除吗?"
                        @confirm="() => handleOnoffDelete(record.key)"
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
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="4"
          tab="大件(非拆装)"
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
                  @click="handleLargeAdd"
                >
                  添加大件
                </a-button>
                <a-table
                  :columns="columns_large"
                  :data-source="large"
                  :pagination="false"
                  size="small"
                >
                  <template
                    slot="name"
                    slot-scope="text, record"
                  >
                    <a-select
                      show-search
                      v-decorator="[`name[${record.key}]`, { rules: [{ required: true, message: '请选择大件！' }]}]"
                      placeholder="选择大件"
                    >
                      <a-select-option value="elevators">2-3门或推拉门衣柜/书柜</a-select-option>
                      <a-select-option value="stairs">楼梯</a-select-option>
                    </a-select>
                  </template>
                  <template
                    slot="num"
                    slot-scope="text, record"
                  >
                    <a-input-number
                      :min="1"
                      :max="10"
                      v-decorator="[`num[${record.key}]`, { rules: [{ required: true, message: '请选择数量！' }]}]"
                      style="width:100%"
                    />
                  </template>
                  <span
                    slot="action"
                    slot-scope="text, record"
                  >
                    <template>
                      <a-popconfirm
                        v-if="large.length"
                        title="确定删除吗?"
                        @confirm="() => handleLargeDelete(record.key)"
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
                  1200元
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

let timeout

function fetch (value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

  function fake () {
    // const str = querystring.encode({
    //   ak: 'ZgAYCeb2UwqFqxH8UjTDuljnLO4rNunZ',
    //   query: value,
    //   region: '全国',
    //   output: 'json'
    // })
    jsonp('https://bird.ioliu.cn/v1/?url=' + 'https://apis.map.qq.com/ws/place/v1/suggestion/?region=北京&keyword=美食&key=SF7BZ-5R4OF-65AJI-J6CZQ-MIGHJ-MAFOI', { timeout: 20000 })
      .then(response => response.json())
      .then(d => {
        console.log(d.data)
        // if (currentValue === value) {
        //   const result = d.result
        //   console.log(result)
        //   const data = []
        //   result.forEach(r => {
        //     data.push({
        //       value: r.name,
        //       text: r.name
        //     })
        //   })
        //   callback(data)
        // }
      })
  }

  timeout = setTimeout(fake, 300)
}
export default {
  data () {
    return {
      columns_car: [
        {
          title: '车型',
          dataIndex: 'name'
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
        }
      ],
      columns_route: [
        {
          title: '地址',
          dataIndex: 'location',
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
      columns_onoff: [
        {
          title: '名称',
          dataIndex: 'name',
          width: '40%',
          scopedSlots: { customRender: 'name' }
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
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns_large: [
        {
          title: '名称',
          dataIndex: 'name',
          width: '40%',
          scopedSlots: { customRender: 'name' }
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
      cars: [
        {
          key: 0,
          name: 'John Brown',
          price: 300,
          num: 0,
          total: 0
        },
        {
          key: 1,
          name: 'Jim Green',
          price: 400,
          num: 0,
          total: 0
        },
        {
          key: 2,
          name: 'Joe Black',
          price: 400,
          num: 0,
          total: 0
        }
      ],
      data: [],
      route: [
        {
          key: 0,
          location: '',
          room_number: '',
          stairs_or_elevators: '',
          floor_num: 0,
          parking_distance: 0
        },
        {
          key: 1,
          location: 'Jim Green',
          room_number: '',
          stairs_or_elevators: 'stairs',
          floor_num: 0,
          parking_distance: 0
        }
      ],
      onoff: [],
      large: [],
      routeCount: 2,
      onoffCount: 0,
      largeCount: 0
    }
  },
  methods: {
    moment,
    add () {
      this.visible = true
    },
    handleCarNumChange (value, key) {
      const newData = [...this.cars]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['num'] = value
        target['total'] = target['num'] * target['price']
        this.cars = newData
      }
    },
    handleRouteLocationSearch (value) {
      fetch(value, data => (this.data = data))
    },
    handleRouteLocationChange (value, key) {
            const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['location'] = value
        this.route = newData
      }
      console.log(value)
      fetch(value, data => (this.data = data))
    },
    handleRouteInputChange (value, key, column) {
      const newData = [...this.route]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.route = newData
      }
      console.log(this.route)
    },
    test () {
      alert('sss')
    },
    edit (record) {
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleRouteAdd () {
      const { routeCount } = this
      const newData = {
        key: routeCount,
        name: '2-3门或推拉门衣柜/书柜',
        price: 0,
        num: 1,
        total: 0
      }
      this.route.splice(-1, 0, newData)
      this.routeCount = routeCount + 1
    },
    handleRouteDelete (key) {
      this.route = this.route.filter(item => item.key !== key)
    },
    handleOnoffAdd () {
      const { onoff, onoffCount } = this
      const newData = {
        key: onoffCount,
        name: '2-3门或推拉门衣柜/书柜',
        price: 0,
        num: 1,
        total: 0
      }
      this.onoff = [...onoff, newData]
      this.onoffCount = onoffCount + 1
    },
    handleOnoffDelete (key) {
      this.onoff = this.route.filter(item => item.key !== key)
    },
    handleLargeAdd () {
      const { large, largeCount } = this
      const newData = {
        key: largeCount,
        name: '2-3门或推拉门衣柜/书柜',
        price: 0,
        num: 1,
        total: 0
      }
      this.large = [...large, newData]
      this.largeCount = largeCount + 1
    },
    handleLargeDelete (key) {
      this.large = this.large.filter(item => item.key !== key)
    },
    handleCancel () {
      this.visible = false
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      // this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
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
</style>
