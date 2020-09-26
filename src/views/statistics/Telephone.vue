<!-- 接线员报表--->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="接线员">
              <a-input
                v-model="queryParam.name"
                @keyup.enter.native="$refs.table.refresh(true)"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="下单日期">
              <a-range-picker @change="onChange1" />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <span class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="$refs.table.refresh(true)"
              >查询</a-button>
              <a-button
                style="margin-left: 8px"
                @click="() => queryParam = {}"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
    >
    </s-table>

  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { Telephone } from '@/api/statistics'

export default {
  name: 'StatisticsTelephone',
  components: {
    STable
  },
  data () {
    return {

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '接线员',
          dataIndex: 'name'
        },
        {
          title: '总接单量',
          dataIndex: 'totalCount'
        },
        {
          title: '已成交单量',
          dataIndex: 'completedCount'
        },
        {
          title: '进行中单量',
          dataIndex: 'ongoingCount'
        },
        {
          title: '未成交单量',
          dataIndex: 'cancelCount'
        },
        {
          title: '接单总金额',
          dataIndex: 'totalCost'
        },
        {
          title: '已成交总金额',
          dataIndex: 'completedCost'
        },
        {
          title: '进行中总金额',
          dataIndex: 'ongoingCost'
        },
        {
          title: '未成交总金额',
          dataIndex: 'cancelCost'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return Telephone(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
      moment,
    handleOk () {
      this.$refs.table.refresh()
    },
    onChange1 (date, dateString) {
      this.queryParam.orderDate = dateString
    }
  }
}
</script>
