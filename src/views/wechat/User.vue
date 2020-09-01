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
      <!-- <template
        slot="image"
        slot-scope="text"
      >

        <img v-if="text" :src="text" width="100"/>

      </template> -->

    </s-table>

  </a-card>
</template>

<script>
import { STable } from '@/components'

// import { getGoods, delGoods } from '@/api/basic/goods'
// import { getCategory } from '@/api/common'

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
          title: '用户ID',
          dataIndex: 'name'
        },
        {
          title: '微信头像',
          dataIndex: 'price'
        },
        {
          title: '微信昵称',
          dataIndex: 'category'
        },
        {
          title: '性别',
          dataIndex: 'sort'
        },
        {
          title: '国家',
          dataIndex: 'category'
        },
        {
          title: '省份',
          dataIndex: 'sort'
        },
        {
          title: '城市',
          dataIndex: 'category'
        },
        {
          title: '注册时间',
          dataIndex: 'sort'
        }
      ],
      category: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // return getGoods(Object.assign(parameter, this.queryParam)).then(res => {
        //   return res.result
        // })
      }
    }
  },
  created () {
    // getCategory({ t: new Date() }).then(res => {
    //   this.category = res
    // })
  },
  methods: {
  handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
