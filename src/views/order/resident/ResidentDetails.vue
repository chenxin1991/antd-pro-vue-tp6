<!-- 居民搬家-详情 -->
<template>
  <div>
    <a-drawer
      width="800"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <p :style="[pStyle, pStyle2]">
        订单详情
      </p>
      <p :style="pStyle">
        预约
      </p>
      <a-row>
        <a-col :span="24">
          <a-descriptions>
            <a-descriptions-item label="订单来源">
              {{ source }}
            </a-descriptions-item>
            <a-descriptions-item label="客户名">
              {{ customer }}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              {{ phone }}
            </a-descriptions-item>
            <a-descriptions-item label="预约日期">
              {{ appointDate }}
            </a-descriptions-item>
            <a-descriptions-item label="时间段">
              {{ appointTime }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <p :style="pStyle">
        车辆
      </p>
      <a-row>
        <a-col :span="24">
          <a-table
            :columns="cars_columns"
            :pagination="false"
            :bordered="true"
            :data-source="cars_data"
          >
            <a
              slot="name"
              slot-scope="text"
            >{{ text }}</a>
          </a-table>
        </a-col>
      </a-row>
      <p :style="pStyle">
        起始地
      </p>
      <a-row>
        <a-col :span="24">
          <a-table
            :columns="routes_columns"
            :pagination="false"
            :bordered="true"
            :data-source="routes_data"
          >
            <template
              slot="stairs_or_elevators"
              slot-scope="text"
            >
              <span v-if="text=== '0'">电梯</span>
              <span v-else>楼梯</span>
            </template>

            <template
              slot="parking_distance"
              slot-scope="text"
            >
              <span v-if="text=== '0'">低于30米</span>
              <span v-if="text=== '1'">30-50米</span>
              <span v-if="text=== '2'">50-100米</span>
              <span v-if="text=== '3'">100米以上</span>
              <span v-if="text=== '4'">地下室出入</span>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
      </a-row>
      <p :style="pStyle">
        物品
      </p>
      <a-row>
        <a-col :span="24">
          <a-table
            :columns="goods_columns"
            :pagination="false"
            :bordered="true"
            :data-source="goods_data"
          >
            <template
              slot="image_url"
              slot-scope="text"
            ><img
              class="goods-img"
              :src="text"
            />
            </template>
          </a-table>
        </a-col>
      </a-row>
      <!-- <a-divider /> -->
      <p :style="pStyle">
        价格明细
      </p>
      <a-row>
        <a-col :span="24">
          <a-descriptions>
            <a-descriptions-item label="车辆费用">
              {{ carCost }}
            </a-descriptions-item>
            <a-descriptions-item label="特殊时间段费用">
              {{ specialTimeCost }}
            </a-descriptions-item>
            <a-descriptions-item label="实际距离">
              {{ distance }}公里
            </a-descriptions-item>
            <a-descriptions-item label="距离费用">
              {{ distanceCost }}
            </a-descriptions-item>
            <a-descriptions-item label="楼层费用">
              {{ floorCost }}
            </a-descriptions-item>
            <a-descriptions-item label="停车距离费用">
              {{ parkingCost }}
            </a-descriptions-item>
            <a-descriptions-item label="物品费用">
              {{ goodsCost }}
            </a-descriptions-item>
            <a-descriptions-item label="总价">
              {{ totalCost }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: 'ResidentDetails',
  components: {},
  data () {
    return {
      visible: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
        marginTop: '16px'
      },
      pStyle2: {
        marginBottom: '24px'
      },
      // 预约
      source: '',
      customer: '',
      phone: '',
      appointDate: '',
      appointTime: '',
      // 车辆
      cars: [],
      // 起始地
      routes: [],
      distance: '',
      // 物品
      goods: [],
      carCost: '',
      specialTimeCost: '',
      distanceCost: '',
      floorCost: '',
      parkingCost: '',
      goodsCost: '',
      totalCost: '',
      cars_columns: [
        {
          title: '车型',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'age',
          width: 120
        },
        {
          title: '数量',
          dataIndex: 'num',
          key: 'num',
          width: 120,
          ellipsis: true
        },
        {
          title: '总计',
          dataIndex: 'total',
          key: 'total',
          width: 120,
          ellipsis: true
        }
      ],
      cars_data: [],
      routes_columns: [
        {
          title: '地址',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '门牌号',
          dataIndex: 'room_number',
          key: 'room_number',
          width: 100
        },
        {
          title: '电梯或楼梯',
          dataIndex: 'stairs_or_elevators',
          key: 'stairs_or_elevators',
          width: 120,
          ellipsis: true,
          scopedSlots: { customRender: 'stairs_or_elevators' }
        },
        {
          title: '楼层数',
          dataIndex: 'floor_num',
          key: 'floor_num',
          width: 100,
          ellipsis: true
        },
        {
          title: '停车位距离',
          dataIndex: 'parking_distance',
          key: 'parking_distance',
          width: 120,
           scopedSlots: { customRender: 'parking_distance' },
          ellipsis: true
        }
      ],
      routes_data: [],
      goods_columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'price',
          width: 100
        },
        {
          title: '数量',
          dataIndex: 'num',
          key: 'num',
          width: 100,
          ellipsis: true
        },
        {
          title: '总计',
          dataIndex: 'total',
          key: 'total',
          width: 100,
          ellipsis: true
        },
        {
          title: '图片',
          dataIndex: 'image_url',
          key: 'image_url',
          width: 120,
          scopedSlots: { customRender: 'image_url' },
          ellipsis: true
        }
      ],
      goods_data: []
    }
  },

  computed: {},

  mounted () {},

  created () {},

  methods: {
    edit (record) {
      // console.log(record)
      this.visible = true

      this.source = record.source
      this.customer = record.customer
      this.phone = record.phone
      this.appointDate = record.appointDate
      this.appointTime = record.appointTime
      this.distance = record.distance
      this.carCost = record.carCost
      this.specialTimeCost = record.specialTimeCost
      this.distanceCost = record.distanceCost
      this.floorCost = record.floorCost
      this.parkingCost = record.parkingCost
      this.goodsCost = record.goodsCost
      this.totalCost = record.totalCost

      this.cars_data = record.cars
      this.routes_data = record.routes
      this.goods_data = record.goods
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style lang='less' scoped>
.goods-img {
  width: 70px;
  height: 70px;
}
</style>
