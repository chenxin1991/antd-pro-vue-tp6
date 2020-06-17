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
                v-model="queryParam.keyword"
                @keyup.enter.native="$refs.table.refresh(true)"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="下单日期">
              <a-range-picker />
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="预约日期">
              <a-range-picker />
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
                <a-select-option value="0">待受理</a-select-option>
                <a-select-option value="1">待派单</a-select-option>
                <a-select-option value="2">待开工</a-select-option>
                <a-select-option value="3">待完成</a-select-option>
                <a-select-option value="4">待评价</a-select-option>
                <a-select-option value="5">已关闭</a-select-option>
                <a-select-option value="6">已取消</a-select-option>
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
              >
                <a-select-option value="0">未支付</a-select-option>
                <a-select-option value="1">已支付</a-select-option>
              </a-select>
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
        icon="plus"
        @click="handleAdd()"
      >新建</a-button>
    </div>

    <s-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadData"
    >
      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDispatch(record)">派单</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleGrap(record)">抢单</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDelete(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <resident-form
      ref="residentForm"
      @ok="handleOk"
    />
    <dispatch-form
      ref="dispatchForm"
      @ok="handleOk"
    />
    <grap-form
      ref="grapForm"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import ResidentForm from './ResidentForm'
import DispatchForm from './DispatchForm'
import GrapForm from './GrapForm'
import { getResidentOrders, delResidentOrder } from '@/api/order/resident'

export default {
  name: 'OrderResident',
  components: {
    STable,
    ResidentForm,
    GrapForm,
    DispatchForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '订单号',
          dataIndex: 'number'
        },
        {
          title: '订单来源',
          dataIndex: 'source' },
        {
          title: '下单时间',
          dataIndex: 'create_time'
        },
        {
          title: '预约时间',
          dataIndex: 'appointment'
        },
        {
          title: '客户名',
          dataIndex: 'customer'
        },
        {
          title: '联系电话',
          dataIndex: 'phone'
        },
        {
          title: '订单状态',
          dataIndex: 'order_status'
        },
        {
          title: '支付状态',
          dataIndex: 'pay_status'
        },
        {
          title: '接线员',
          dataIndex: 'username'
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
        return getResidentOrders(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.residentForm.add()
    },
    handleEdit (record) {
      this.$refs.residentForm.edit(record)
    },
    handleDispatch (record) {
      console.log(record)
      this.$refs.dispatchForm.edit(record)
    },
    handleGrap (record) {
      console.log(record)
      this.$refs.grapForm.edit(record)
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.number} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          delResidentOrder(record)
            .then(res => {
              that.$message.success('删除成功')
              that.$refs.table.refresh()
            })
            .catch(err => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
