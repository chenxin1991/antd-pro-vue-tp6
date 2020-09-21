<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="车型">
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
      bordered
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
    <car-form
      ref="carForm"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CarForm from './CarForm'
import { getCars, delCar } from '@/api/basic/car'

export default {
  name: 'BasicCar',
  components: {
    STable,
    CarForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '车型',
          dataIndex: 'name'
        },
        {
          title: '载重',
          dataIndex: 'loadSize'
        },
        {
          title: '长宽高',
          dataIndex: 'lwh'
        },
        {
          title: '载货体积',
          dataIndex: 'volume'
        },
        {
          title: '配备工人',
          dataIndex: 'manning'
        },
        {
          title: '单价（元）',
          dataIndex: 'price'
        },
        {
          title: '超过多少公里计费',
          dataIndex: 'km_standard'
        },
        {
          title: '超出公里数单价（元）',
          dataIndex: 'km_price'
        },
        {
          title: '搬入搬出（楼梯）收费标准',
          children: [
            {
              title: '多少楼层开始计费',
              dataIndex: 'floor_standard'
            },
            {
              title: '单价（元）（每楼层每车）',
              dataIndex: 'floor_price'
            }
          ]
        },
        {
          title: '停车位距离收费标准（元）（每车）',
          children: [
            {
              title: '低于30米',
              dataIndex: 'distance1'
            },
            {
              title: '30-50米',
              dataIndex: 'distance2'
            },
            {
              title: '50-100米',
              dataIndex: 'distance3'
            },
            {
              title: '100米以上或地下室出入',
              dataIndex: 'distance4'
            }
          ]
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
        return getCars(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.carForm.add()
    },
    handleEdit (record) {
      this.$refs.carForm.edit(record)
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
          delCar(record)
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
