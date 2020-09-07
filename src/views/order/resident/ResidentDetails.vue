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
          <a-descriptions >
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
          <a-table :columns="cars_columns" :pagination="false" :bordered="true" :data-source="cars_data" >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </a-col>
      </a-row>
      <p :style="pStyle">
        起始地
      </p>
      <a-row>
        <a-col :span="24">
          <a-table :columns="routes_columns" :pagination="false" :bordered="true" :data-source="routes_data" >
            <a slot="name" slot-scope="text">{{ text }}</a>
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
          <a-table :columns="goods_columns" :pagination="false" :bordered="true" :data-source="goods_data" >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
          <a-descriptions
            v-for="(item,index) in goods"
            :key="index"
            title="物品"
          >
            <a-descriptions-item label="名称">
              {{ item.name }}
            </a-descriptions-item>
            <a-descriptions-item label="单价">
              {{ item.price }}
            </a-descriptions-item>
            <a-descriptions-item label="数量">
              {{ item.num }}
            </a-descriptions-item>
            <a-descriptions-item label="总计">
              {{ item.total }}
            </a-descriptions-item>
            <a-descriptions-item label="图片">
              {{ item.image_url }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-divider />
      <!-- <p :style="pStyle">
        价格明细
      </p> -->
      <a-row>
        <a-col :span="24">
          <a-descriptions title="价格明细">
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
              {{ floorCost }}元
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
        marginBottom: '16px'
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
    key: 'age'
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
    ellipsis: true
  },
  {
    title: '总计',
    dataIndex: 'total',
    key: 'total',
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
    key: 'room_number'
  },
  {
    title: '电梯或楼梯',
    dataIndex: 'parking_distance',
    key: 'parking_distance',
    ellipsis: true
  },
  {
    title: '楼层数',
    dataIndex: 'floor_num',
    key: 'floor_num',
    ellipsis: true
  },
  {
    title: '停车位距离',
    dataIndex: 'distance',
    key: 'distance',
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
    key: 'price'
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
    ellipsis: true
  },
  {
    title: '总计',
    dataIndex: 'total',
    key: 'total',
    ellipsis: true
  },
  {
    title: '图片',
    dataIndex: 'image_url',
    key: 'image_url',
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
      console.log(record)
      this.visible = true

      this.source = record.source
      this.customer = record.customer
      this.phone = record.phone
      this.appointDate = record.appointDate
      this.appointTime = record.appointTime

      // this.cars = record.cars

      // this.routes = record.routes
      this.distance = record.distance

      // this.goods = record.goods

      this.carCost = record.carCost
      this.specialTimeCost = record.specialTimeCost
      this.distanceCost = record.distanceCost
      this.floorCost = record.floorCost
      this.parkingCost = record.parkingCost
      this.goodsCost = record.goodsCost
      this.totalCost = record.totalCost

      this.cars_data = record.cars
      this.routes_data = record.routes
        this.routes_data.distance = record.distance

        this.goods_data = record.goods
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
