<!-- 单位企业搬迁-订单详情 -->
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
      <a-row>
        <a-col :span="24">
          <a-descriptions bordered>
            <a-descriptions-item label="订单号" >
              <span>{{ record.number }}</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="订单类型"
              :span="2"
            >
              <span v-if="`${record.type}`=== '1'">投标项目</span>
              <span v-if="`${record.type}`=== '2'">竞标项目</span>
              <span v-if="`${record.type}`=== '3'">常规项目</span>
            </a-descriptions-item>
            <a-descriptions-item label="订单来源">
              <span v-if="`${record.source}`=== '1'">项目公告</span>
              <span v-if="`${record.source}`=== '2'">前台电话</span>
              <span v-if="`${record.source}`=== '3'">平台系统</span>
              <span v-if="`${record.source}`=== '4'">第三方推荐</span>
              <span v-if="`${record.source}`=== '5'">其他来源</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="单位名称"
              :span="2"
            >
              <span>{{ record.name }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="联系人">
              <span>{{ record.customer }}</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="联系电话"
              :span="2"
            >
              <span>{{ record.phone }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="下单手机号">
              <span>{{ record.userMobile }}</span>
            </a-descriptions-item>
            <a-descriptions-item
              label="下单时间"
              :span="2"
            >
              <span>{{ record.create_time }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="描述">
              {{ record.description }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-drawer>

  </div>
</template>

<script>
export default {
  name: 'CompanyDetails',
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
      }
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
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
