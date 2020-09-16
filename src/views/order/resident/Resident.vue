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
                <a-select-option value="0">待确认</a-select-option>
                <a-select-option value="1">待派单</a-select-option>
                <a-select-option value="2">待开工</a-select-option>
                <a-select-option value="3">待完工</a-select-option>
                <a-select-option value="4">待评价</a-select-option>
                <a-select-option value="5">已关闭</a-select-option>
                <a-select-option value="-1">已取消</a-select-option>
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
      <template
        slot="source"
        slot-scope="text"
      >
        <template v-if="text=='1'">来电</template>
        <template v-if="text=='2'">上门</template>
        <template v-if="text=='3'">小程序</template>
      </template>
      <template
        slot="totalCost"
        slot-scope="text,record"
      >
        <span>{{ text }}</span>
        <span
          v-if="record.isOrigin"
          style="color:#ff5155;margin-left:5px;font-size:12px;"
        >起</span>
      </template>
      <template
        slot="isOtherLarge"
        slot-scope="text"
      >
        <template v-if="text=='0'">否</template>
        <template v-if="text=='1'">是</template>
      </template>
      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDetails(record)">详情</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="record.orderStatus==='待确认'">
                <a @click="handleConfirm(record)">确认</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleCancel(record)">取消</a>
              </a-menu-item>
              <a-menu-item v-if="record.orderStatus==='待派单'">
                <a @click="handleDispatch(record)">派单</a>
              </a-menu-item>
              <!-- <a-menu-item>
                <a @click="handleGrap(record)">抢单</a>
              </a-menu-item> -->
              <a-menu-item>
                <a @click="handleDelete(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <!-- 编辑订单 -->
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
    <!-- 订单详情 -->
    <ResidentDetails
      ref="ResidentDetails"
      @ok="handleOk"
    ></ResidentDetails>
    <!-- 更多-取消订单弹框 -->
    <CancelForm ref="CancelForm"></CancelForm>

  </a-card>
</template>

<script>
import { STable } from '@/components'
import ResidentForm from './ResidentForm'
import DispatchForm from './DispatchForm'
import GrapForm from './GrapForm'
import ResidentDetails from './ResidentDetails'
import CancelForm from './CancelForm'
import { getResidentOrders, delResidentOrder, confirmResidentOrders } from '@/api/order/resident'

export default {
  name: 'OrderResident',
  components: {
    STable,
    ResidentForm,
    GrapForm,
    DispatchForm,
    ResidentDetails,
    CancelForm
  },
  data () {
    return {
      isResidentDetails: false,
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
          dataIndex: 'source',
          scopedSlots: { customRender: 'source' }
        },
        {
          title: '下单时间',
          dataIndex: 'create_time'
        },
        {
          title: '预约日期',
          dataIndex: 'appointDate'
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
          title: '总报价',
          dataIndex: 'totalCost',
          scopedSlots: { customRender: 'totalCost' }
        },
        {
          title: '订单状态',
          dataIndex: 'orderStatus'
        },
        {
          title: '支付状态',
          dataIndex: 'payStatus'
        },
        {
          title: '接线员',
          dataIndex: 'adminname'
        },
        {
          title: '队长',
          dataIndex: 'leadername'
        },
        {
          title: '是否有其他大件',
          dataIndex: 'isOtherLarge',
          scopedSlots: { customRender: 'isOtherLarge' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return getResidentOrders(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      }
    }
  },
  created () {},
  methods: {
    handleAdd () {
      this.$refs.residentForm.add()
    },
    handleEdit (record) {
      this.$refs.residentForm.edit(record)
    },
    handleDispatch (record) {
      this.$refs.dispatchForm.edit(record)
    },
    handleDetails (record) {
      this.$refs.ResidentDetails.edit(record)
    },
    handleGrap (record) {
      this.$message.warning('功能暂未开放！')
      // this.$refs.grapForm.edit(record)
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: '警告',
        content: `真的要删除订单 ${record.number} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          delResidentOrder(record)
            .then((res) => {
              that.$message.success('删除成功')
              that.$refs.table.refresh()
            })
            .catch((err) => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    // 更多-确定
    handleConfirm (record) {
      const that = this
      if (record.isOrigin === 1) {
        this.$message.error('请确定物品价格是否正确')
        return false
      }
      this.$confirm({
        title: '警告',
        content: `是否确认订单 ${record.number}?`,
        okText: '确认',
        okType: 'danger',
        onOk () {
          confirmResidentOrders(record)
            .then((res) => {
              that.$message.success('确认成功')
              that.$refs.table.refresh()
            })
            .catch((err) => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    },
    // 更多-取消订单
    handleCancel () {
      this.$refs.CancelForm.showModal()
    }
  }
}
</script>
