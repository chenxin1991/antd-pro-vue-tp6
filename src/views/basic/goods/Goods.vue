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
            <a-form-item label="分类">
              <a-select
                v-model="queryParam.cid"
                placeholder="请选择"
              >
                <a-select-option
                  :key="index"
                  v-for="(item, index) in category"
                  :value="item.id"
                >{{ item.name }}</a-select-option>
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
        slot="image"
        slot-scope="text"
      >

        <img v-if="text" :src="text" width="100"/>

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
    <goods-form
      ref="GoodsForm"
      :params="{category:category}"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import GoodsForm from './GoodsForm'
import { getGoods, delGoods } from '@/api/basic/goods'
import { getCategory } from '@/api/common'

export default {
  name: 'BasicGoods',
  components: {
    STable,
    GoodsForm
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
          title: '单价（元）',
          dataIndex: 'price'
        },
        {
          title: '分类',
          dataIndex: 'category'
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      category: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getGoods(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  created () {
    getCategory({ t: new Date() }).then(res => {
      this.category = res
    })
  },
  methods: {
    handleAdd () {
      this.$refs.GoodsForm.add()
    },
    handleEdit (record) {
      this.$refs.GoodsForm.edit(record)
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
          delGoods(record)
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
