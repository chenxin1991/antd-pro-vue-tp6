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
import jsonp from 'fetch-jsonp'
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
      .then(response => response.json())
      .then(d => {
        const result = d.data
        const data = []
        result.forEach(r => {
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
  value.forEach(r => {
    const location = JSON.parse(r.location)
    if (r.key === 0) {
      from = location.lat + ',' + location.lng
    } else if (r.key === 1) {
      to = location.lat + ',' + location.lng
    } else {
      if (waypoints) {
        waypoints = waypoints + ';' + location.lat + ',' + location.lng
      } else {
        waypoints = location.lat + ',' + location.lng
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
      .then(response => response.json())
      .then(d => {
        if (d.status === 0) {
          const route = d.result.routes[0]
          distance = Math.round(route.distance / 1000)
          callback(distance)
        } else {
          callback(distance)
        }
      })
      .catch(err => {
        console.log(err)
        callback(distance)
      })
  }
}
let timeout
export default {
name: 'OriginalPlace',
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
       routeCount: 2
    }
  },

  components: {},

  computed: {},

  mounted: {},

  created () {},

  methods: {
        onLocationSearch (value, key) {
      if (value) {
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
