<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="订单号/客户名/手机号">
              <a-input
                v-model="queryParam.id"
                placeholder=""
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="下单日期">
              <a-range-picker @change="onChange" width="100%"/>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="预约日期">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="订单来源">
              <a-select
                v-model="queryParam.status"
                placeholder="请选择"
                default-value="0"
              >
                <a-select-option value="0">来电</a-select-option>
                <a-select-option value="1">上门</a-select-option>
                <a-select-option value="2">小程序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="订单状态">
              <a-select
                v-model="queryParam.status"
                placeholder="请选择"
                default-value="0"
              >
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="支付状态">
              <a-select
                v-model="queryParam.status"
                placeholder="请选择"
                default-value="0"
              >
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
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
        icon="plus"
        @click="$refs.modal.add()"
      >新建</a-button>
      <a-dropdown
        v-action:edit
        v-if="selectedRowKeys.length > 0"
      >
        <a-menu slot="overlay">
          <a-menu-item key="2">
            <a-icon type="lock" />禁用</a-menu-item>
          <a-menu-item key="3">
            <a-icon type="lock" />启用</a-menu-item>
          <a-menu-item key="1">
            <a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="small"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      showPagination="auto"
    >
      <span
        slot="status"
        slot-scope="text"
      >
        <a-badge
          :status="text | statusTypeFilter"
          :text="text | statusFilter"
        />
      </span>
      <span
        slot="description"
        slot-scope="text"
      >
        <ellipsis
          :length="16"
          tooltip
        >{{ text }}</ellipsis>
      </span>

      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDispatch(record)">派单</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleGrap(record)">抢单</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <step-by-step-modal ref="modal" @ok="handleOk"/>
    <create-form ref="createForm" @ok="handleOk"/>
    <grap-form ref="grapForm" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './StepByStepModal'
import CreateForm from './CreateForm'
import GrapForm from './GrapForm'
import { getRoleList, getServiceList } from '@/api/manage'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'OrderResident',
  components: {
    STable,
    Ellipsis,
    StepByStepModal,
    CreateForm,
    GrapForm
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '订单号',
          dataIndex: 'no'
        },
        {
          title: '订单来源',
          dataIndex: 'callNo',
          sorter: true
        },
        {
          title: '下单时间',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '预约时间',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '客户名',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '联系电话',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '支付状态',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  methods: {
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleDispatch (record) {
      console.log(record)
      this.$refs.createForm.edit(record)
    },
    handleGrap (record) {
      console.log(record)
      this.$refs.grapForm.edit(record)
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
