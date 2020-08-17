<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button
        type="primary"
        icon="plus"
        @click="handleAdd()"
      >新建</a-button>
      <a-button
        type="primary"
        @click="$refs.table.refresh(true)"
      >刷新</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :pageSize="20"
    >
      <template slot="is_free" slot-scope="text">
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
          <a @click="handleDelete(record)">删除</a>
        </template>
      </span>
    </s-table>
    <category-form
      ref="CategoryForm"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CategoryForm from './CategoryForm'
import { getCategorys, delCategory } from '@/api/basic/category'

export default {
  name: 'BasicCategory',
  components: {
    STable,
    CategoryForm
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
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '是否为几车内免费',
          dataIndex: 'is_free',
          scopedSlots: { customRender: 'is_free' }
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
        return getCategorys(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.CategoryForm.add()
    },
    handleEdit (record) {
      this.$refs.CategoryForm.edit(record)
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
          delCategory(record)
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
