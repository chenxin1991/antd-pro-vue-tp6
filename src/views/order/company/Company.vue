<!--企业单位搬迁-->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="订单号/单位名称/联系电话">
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
            <a-form-item label="订单类型">
              <a-select
                allowClear
                v-model="queryParam.type"
                placeholder="请选择"
              >
                <a-select-option value="1">投标项目</a-select-option>
                <a-select-option value="2">竞价项目</a-select-option>
                <a-select-option value="3">常规项目</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="订单来源">
              <a-select
                allowClear
                v-model="queryParam.source"
                placeholder="请选择"
              >
                <a-select-option value="1">项目公告</a-select-option>
                <a-select-option value="2">前台电话</a-select-option>
                <a-select-option value="3">平台系统</a-select-option>
                <a-select-option value="4">第三方推荐</a-select-option>
                <a-select-option value="5">其他来源</a-select-option>
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
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
    >
      <template
        slot="type"
        slot-scope="text"
      >
        <template v-if="text==1">投标项目</template>
        <template v-if="text==2">竞价项目</template>
        <template v-if="text==3">常规项目</template>
      </template>
      <template
        slot="source"
        slot-scope="text"
      >
        <template v-if="text==1">项目公告</template>
        <template v-if="text==2">前台电话</template>
        <template v-if="text==3">平台系统</template>
        <template v-if="text==4">第三方推荐</template>
        <template v-if="text==5">其他来源</template>
      </template>
      <template
        slot="status"
        slot-scope="text"
      >
        <template v-if="text==0">待派单</template>
        <template v-if="text==1">正沟通</template>
        <template v-if="text==2">已踏勘</template>
        <template v-if="text==3">已报价</template>
        <template v-if="text==4">已签合同</template>
        <template v-if="text==5">施工中</template>
        <template v-if="text==6">已完工</template>
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
              <a-menu-item>
                <a @click="handleDispatch(record)">派单</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDelete(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <CompanyForm
      ref="CompanyForm"
      @ok="handleOk"
    />
    <CompanyDetails ref="CompanyDetails" @ok="handleOk"></CompanyDetails>
    <DispatchForm ref="DispatchForm" @ok="handleOk"></DispatchForm>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CompanyForm from './CompanyForm'
import DispatchForm from './DispatchForm'
import CompanyDetails from './CompanyDetails'
import { getCompanyOrders, delCompanyOrder } from '@/api/order/company'

export default {
  name: 'OrderCompany',
  components: {
    STable,
    CompanyForm,
    DispatchForm,
    CompanyDetails
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
          title: '订单类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '订单来源',
          dataIndex: 'source',
          scopedSlots: { customRender: 'source' }
        },
        {
          title: '单位名称',
          dataIndex: 'name'
        },
        {
          title: '联系人',
          dataIndex: 'customer'
        },
        {
          title: '联系电话',
          dataIndex: 'phone'
        },
        {
          title: '描述',
          dataIndex: 'description',
          ellipsis: true
        },
        {
          title: '下单手机号',
          dataIndex: 'userMobile'
        },
        {
          title: '下单时间',
          dataIndex: 'create_time'
        },
        {
          title: '项目经理',
          dataIndex: 'managerName'
        },
        {
          title: '负责人',
          dataIndex: 'leaderName'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '180px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      roles: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return getCompanyOrders(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.CompanyForm.add()
    },
    handleEdit (record) {
      this.$refs.CompanyForm.edit(record)
    },
    handleDispatch (record) {
      this.$refs.DispatchForm.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh()
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
          delCompanyOrder(record)
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
    handleDetails (record) {
      this.$refs.CompanyDetails.edit(record)
    }
  }
}
</script>
