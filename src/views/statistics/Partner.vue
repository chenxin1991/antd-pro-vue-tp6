<!-- 合伙人报表--->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="队长">
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
            <a-form-item label="日期范围">
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

    <div class="table-operator">
      <a-button
        type="primary"
        @click="$refs.table.refresh(true)"
      >刷新</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="user_id"
      :columns="columns"
      :data="loadData"
    >
      <template
        slot="text"
        slot-scope="text"
      >
        {{ text }}
      </template>
      <template
        slot="gender"
        slot-scope="text"
      >
        <span v-if="text==0">女</span>
        <span v-if="text==1">男</span>
      </template>
    </s-table>

  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'

export default {
  name: 'WechatUser',
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
          title: '队长',
          dataIndex: 'user_id'
        },
        {
          title: '接单总数',
          dataIndex: 'avatarUrl',
          scopedSlots: { customRender: 'avatarUrl' }
        },
        {
          title: '已完成订单数',
          dataIndex: 'nickName'
        },
        {
          title: '已完成总金额',
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '待完成订单数',
          dataIndex: 'country'
        },
        {
          title: '待完成总金额',
          dataIndex: 'province'
        },
        {
          title: '好评数',
          dataIndex: 'country'
        },
        {
          title: '中评数',
          dataIndex: 'province'
        }, {
          title: '差评数',
          dataIndex: 'country'
        }
      ],
      loadData: ''
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
