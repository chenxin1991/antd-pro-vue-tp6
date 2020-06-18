<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="名称">
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
    <leader-form
      ref="LeaderForm"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import LeaderForm from './LeaderForm'
import { getLeaders, delLeader } from '@/api/basic/leader'

export default {
  name: 'BasicLeader',
  components: {
    STable,
    LeaderForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
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
      this.$refs.LeaderForm.add()
    },
    handleEdit (record) {
      this.$refs.LeaderForm.edit(record)
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
