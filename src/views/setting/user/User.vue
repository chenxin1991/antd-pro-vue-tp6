<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="用户名/姓名">
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
            <a-form-item label="角色">
              <a-select
                allowClear
                v-model="queryParam.role_id"
                placeholder="请选择"
              >
                <a-select-option
                  :key="index"
                  v-for="(item, index) in roles"
                  :value="item.id"
                >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="6"
            :sm="24"
          >
            <a-form-item label="状态">
              <a-select
                allowClear
                v-model="queryParam.status"
                placeholder="请选择"
              >
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
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
      <span
        slot="status"
        slot-scope="text"
      >
        <a-badge
          v-if="text==='正常'"
          status="success"
          :text="text"
        />
        <a-badge
          v-if="text==='禁用'"
          status="error"
          :text="text"
        />
      </span>
      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a
            v-if="record.status==='正常'"
            @click="handleDisable(record)"
          >禁用</a>
          <a
            v-if="record.status==='禁用'"
            @click="handleEnable(record)"
          >启用</a>
        </template>
      </span>
    </s-table>
    <user-form
      ref="userForm"
      :params="{roles:roles}"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import UserForm from './UserForm'
import { getUsers, disableUser, enableUser } from '@/api/setting/user'
import { getRoles } from '@/api/common'

export default {
  name: 'SettingUser',
  components: {
    STable,
    UserForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '角色',
          dataIndex: 'rolename'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'create_time'
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
      loadData: (parameter) => {
        return getUsers(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      }
    }
  },
  created () {
    getRoles({ t: new Date() }).then((res) => {
      this.roles = res
    })
  },
  methods: {
    handleAdd () {
      this.$refs.userForm.add()
    },
    handleEdit (record) {
      // console.log(record)
      this.$refs.userForm.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDisable (record) {
      const that = this
      this.$confirm({
        title: '警告',
        content: `真的要禁用 ${record.name} 吗?`,
        okText: '禁用',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          disableUser(record)
            .then((res) => {
                if (res.code === 200) {
                  that.$message.success(res.message)
                } else if (res.code === -1) {
                  that.$message.error(res.message)
                }
              that.$refs.table.refresh()
            })
            .catch((err) => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    },
    handleEnable (record) {
      const that = this
      this.$confirm({
        title: '警告',
        content: `真的要启用 ${record.name} 吗?`,
        okText: '启用',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          enableUser(record)
            .then((res) => {
              that.$message.success('启用成功')
              that.$refs.table.refresh()
            })
            .catch((err) => {
              that.$message.error(`load user err: ${err.message}`)
            })
        }
      })
    }
  }
}
</script>
