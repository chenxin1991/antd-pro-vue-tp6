<!-- 居民搬家-订单详情 -->
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
              <span v-if="record.source===1">来电</span>
              <span v-if="record.source===2">上门</span>
              <span v-if="record.source===3">小程序</span>
            </a-descriptions-item>
            <a-descriptions-item label="客户名">
              {{ record.customer }}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              {{ record.phone }}
            </a-descriptions-item>
            <a-descriptions-item label="预约日期">
              {{ record.appointDate }}
            </a-descriptions-item>
            <a-descriptions-item label="时间段">
              {{ record.appointTime }}
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
              {{ record.carCost }}元
            </a-descriptions-item>
            <a-descriptions-item label="特殊时间段费用">
              {{ record.specialTimeCost }}元
            </a-descriptions-item>
            <a-descriptions-item label="实际距离">
              {{ record.distance }}公里
            </a-descriptions-item>
            <a-descriptions-item label="距离费用">
              {{ record.distanceCost }}元
            </a-descriptions-item>
            <a-descriptions-item label="楼层费用">
              {{ record.floorCost }}元
            </a-descriptions-item>
            <a-descriptions-item label="停车距离费用">
              {{ record.parkingCost }}元
            </a-descriptions-item>
            <a-descriptions-item label="物品费用">
              {{ record.goodsCost }}元
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-descriptions>
            <a-descriptions-item
              v-if="record.changeCost>0"
              label="额外增加"
            >
              {{ record.changeCost }}元
            </a-descriptions-item>
            <a-descriptions-item
              v-if="record.changeCost<0"
              label="额外减少"
            >
              {{ record.changeCost }}元
            </a-descriptions-item>
            <a-descriptions-item
              v-if="record.costChangeRemark!==''"
              label="原因"
            >
              {{ record.costChangeRemark }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-descriptions>
            <a-descriptions-item label="总价">
              {{ record.totalCost }}元
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <p :style="pStyle">
        订单评价
      </p>
      <a-row>
        <a-col :span="24">

          <a-descriptions bordered>
            <a-descriptions-item label="评分">
              {{ evaluate.score }}<span v-if="evaluate.score">（分）</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="内容"
              :span="2"
            >
              <span
                v-if="evaluateContent.attitude"
                style="margin:5px;"
              >服务态度好</span>
              <span
                v-if="evaluateContent.professional"
                style="margin:5px;"
              >货品完好</span>
              <span
                v-if="evaluateContent.environment"
                style="margin:5px;"
              >效率高</span>
              <span
                v-if="evaluateContent.efficiency"
                style="margin:5px;"
              >风雨无阻</span>
              <span
                v-if="evaluateContent.time"
                style="margin:5px;"
              >快速准时</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="图片"
              :span="3"
            >
              <viewer :images="evaluate.imageUrls">
                <img
                  v-for="(src,index) in evaluate.imageUrls"
                  :src="src"
                  :key="index"
                  class="evaluateStyle"
                >
              </viewer>
            </a-descriptions-item>
            <a-descriptions-item label="更多评价">
              {{ evaluate.remark }}
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
      record: {},
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
      goods_data: [],
      evaluate: {}, // 订单评价
      evaluateContent: {} // 评价内容
    }
  },

  computed: {},

  mounted () {},

  created () {},

  methods: {
    edit (record) {
      // console.log(record)
      this.visible = true
      this.record = record

      this.cars_data = record.cars
      this.routes_data = record.routes
      this.goods_data = record.goods

      if (record.comment) {
        const evaluate = JSON.parse(record.comment)
        this.evaluate = evaluate
        this.evaluateContent = evaluate.content
      } else {
        this.evaluate = {}
        this.evaluateContent = {}
      }
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
.evaluateStyle {
  width: 100px;
  height: 100px;
  margin: 10px;
}
</style>
