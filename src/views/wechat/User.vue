<!---微信用户-->
<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button
        type="primary"
        @click="$refs.table.refresh(true)"
      >刷新</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="user_id"
      :columns="columns"
      :data="loadData"
    >
      <template
        slot="avatarUrl"
        slot-scope="text"
      >
        <img
          v-if="text"
          :src="text"
          width="60"
        />
      </template>
      <template
        slot="gender"
        slot-scope="text"
      >
        <span v-if="text==0">女</span>
        <span v-if="text==1">男</span>
      </template>
    </s-table>

  </a-card>
</template>

<script>
import { STable } from '@/components'

import { getUsers } from '@/api/wechat/user'

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
          dataIndex: 'user_id'
        },
        {
          title: '微信头像',
          dataIndex: 'avatarUrl',
          scopedSlots: { customRender: 'avatarUrl' }
        },
        {
          title: '微信昵称',
          dataIndex: 'nickName'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '国家',
          dataIndex: 'country'
        },
        {
          title: '省份',
          dataIndex: 'province'
        },
        {
          title: '城市',
          dataIndex: 'city'
        },
        {
          title: '注册时间',
          dataIndex: 'create_time'
        }
      ],
      category: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return getUsers(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
