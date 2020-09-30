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
            <a-form-item label="订单来源">
              <a-select
                allowClear
                v-model="queryParam.source"
                placeholder="请选择"
              >
                <a-select-option value="1">员工或朋友推荐</a-select-option>
                <a-select-option value="2">客户打电话到前台</a-select-option>
                <a-select-option value="3">小程序下单</a-select-option>
                <a-select-option value="4">提前介入项目</a-select-option>
                <a-select-option value="5">合作伙伴介绍项目</a-select-option>
                <a-select-option value="6">其他来源</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="企业名称">
              <a-input
                v-model="queryParam.company"
                placeholder="请输入企业名称"
                @keyup.enter.native="$refs.table.refresh(true)"
              />
            </a-form-item>
          </a-col>
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
      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </template>
      </span>
    </s-table>
    <CompanyForm
      ref="CompanyForm"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CompanyForm from './CompanyForm'
import { getLeaders, delLeader } from '@/api/basic/leader'

export default {
  name: 'Company',
  components: {
    STable,
    CompanyForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '来源',
          dataIndex: 'source'
        },
          {
          title: '单位名称',
          dataIndex: 'company'
        },
        {
          title: '订单号',
          dataIndex: 'orderNumber'
        },
         {
          title: '联系人',
          dataIndex: 'linkman'
        },
          {
          title: '联系电话',
          dataIndex: 'phone'
        },

        {
          title: '描述',
          dataIndex: 'describe'
        }, {
          title: '下单手机号',
          dataIndex: 'orderMobile'
        },
        {
          title: '下单时间',
          dataIndex: 'orderTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      roles: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getLeaders(Object.assign(parameter, this.queryParam)).then(res => {
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
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          delLeader(record)
            .then(res => {
              that.$message.success('删除成功')
              that.$refs.table.refresh()
            })
            .catch(err => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    }
  }
}
</script>
