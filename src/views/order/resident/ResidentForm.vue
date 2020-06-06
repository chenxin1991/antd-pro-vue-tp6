<template>
  <a-modal
    title="新增订单"
    :width="960"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bodyStyle="{padding:'24px 24px 12px 24px'}"
    @cancel="handleCancel"
  >
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-tabs
        default-active-key="1"
        tabPosition="left"
      >
        <a-tab-pane
          key="1"
          tab="预约与车辆"
        >
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="预约日期">
                <a-date-picker
                  v-decorator="[
                    'dateTime',
                    {
                      rules: [{ required: true, message: '请选择预约日期！' }],
                    },
                  ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="时间段">
                <a-select
                  v-decorator="['role_id', { rules: [{ required: true, message: '请选择时间段！' }] }]"
                  placeholder="请选择时间段"
                >
                  <a-select-option value="0">07:00</a-select-option>
                  <a-select-option value="1">08:00</a-select-option>
                  <a-select-option value="2">09:00</a-select-option>
                  <a-select-option value="3">10:00</a-select-option>
                  <a-select-option value="4">11:00</a-select-option>
                  <a-select-option value="5">12:00</a-select-option>
                  <a-select-option value="6">13:00</a-select-option>
                  <a-select-option value="7">14:00</a-select-option>
                  <a-select-option value="8">15:00</a-select-option>
                  <a-select-option value="9">16:00</a-select-option>
                  <a-select-option value="10">17:00</a-select-option>
                  <a-select-option value="11">18:00</a-select-option>
                  <a-select-option value="12">19:00</a-select-option>
                  <a-select-option value="13">20:00</a-select-option>
                  <a-select-option value="14">21:00</a-select-option>
                  <a-select-option value="15">22:00</a-select-option>
                  <a-select-option value="16">23:00</a-select-option>
                  <a-select-option value="17">00:00</a-select-option>
                  <a-select-option value="18">01:00</a-select-option>
                  <a-select-option value="19">02:00</a-select-option>
                  <a-select-option value="20">03:00</a-select-option>
                  <a-select-option value="21">04:00</a-select-option>
                  <a-select-option value="22">05:00</a-select-option>
                  <a-select-option value="23">06:00</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                :labelCol="{
                  xs: { span: 24 },
                  sm: { span: 0 }
                }"
                :wrapperCol="{
                  xs: { span: 24 },
                  sm: { span: 24 }
                }"
              >
                <a-table
                  :columns="columns_car"
                  :data-source="cars"
                  :pagination="false"
                  size="small"
                >
                  <template slot="num">
                    <a-input-number
                      :min="0"
                      :max="10"
                      :default-value="0"
                    />
                  </template>
                </a-table>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="车辆费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="起始地"
        >
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                :labelCol="{
                  xs: { span: 24 },
                  sm: { span: 0 }
                }"
                :wrapperCol="{
                  xs: { span: 24 },
                  sm: { span: 24 }
                }"
              >
                <a-button
                  class="editable-add-btn"
                  @click="handleAdd"
                >
                  添加地点
                </a-button>
                <a-table
                  :columns="columns_route"
                  :data-source="route"
                  :pagination="false"
                  size="small"
                >
                  <template slot="floor_num">
                    <a-input-number
                      :min="0"
                      :max="10"
                      :default-value="0"
                      style="width:100%"
                    />
                  </template>
                  <template slot="parking_distance">
                    <a-select
                      v-decorator="['parking_distance[]', { rules: [{ required: true, message: '请选择停车位距离！' }] }]"
                      placeholder="选择距离"
                    >
                      <a-select-option value="0">低于30米</a-select-option>
                      <a-select-option value="1">30-50米</a-select-option>
                      <a-select-option value="2">50-100米</a-select-option>
                      <a-select-option value="3">100米以上</a-select-option>
                      <a-select-option value="4">地下室出入</a-select-option>
                    </a-select>
                  </template>
                  <template slot="location">
                    <a-auto-complete :data-source="dataSource">
                      <a-input>
                        <a-icon
                          slot="suffix"
                          type="search"
                          class="certain-category-icon"
                          @click="test"
                        />
                      </a-input>
                    </a-auto-complete>
                  </template>
                  <template slot="room_number">
                    <a-input />
                  </template>
                  <template slot="stairs_or_elevators">
                    <a-select
                      v-decorator="['stairs_or_elevators[]', { rules: [{ required: true, message: '请选择电梯或楼梯！' }] }]"
                      placeholder="选择"
                    >
                      <a-select-option value="elevators">电梯</a-select-option>
                      <a-select-option value="stairs">楼梯</a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="实际距离">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  10.6km
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="距离费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="拆装件"
        >
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                :labelCol="{
                  xs: { span: 24 },
                  sm: { span: 0 }
                }"
                :wrapperCol="{
                  xs: { span: 24 },
                  sm: { span: 24 }
                }"
              >
                <a-button
                  class="editable-add-btn"
                  @click="handleAdd"
                >
                  添加拆装件
                </a-button>
                <a-table
                  :columns="columns_onoff"
                  :data-source="onoff"
                  :pagination="false"
                  size="small"
                >
                  <template slot="num">
                    <a-input-number
                      :min="1"
                      :max="10"
                      :default-value="1"
                    />
                  </template>
                </a-table>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="车辆费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="4"
          tab="大件(非拆装)"
        >
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                :labelCol="{
                  xs: { span: 24 },
                  sm: { span: 0 }
                }"
                :wrapperCol="{
                  xs: { span: 24 },
                  sm: { span: 24 }
                }"
              >
                <a-button
                  class="editable-add-btn"
                  @click="handleAdd"
                >
                  添加大件
                </a-button>
                <a-table
                  :columns="columns_large"
                  :data-source="large"
                  :pagination="false"
                  size="small"
                >
                  <template slot="num">
                    <a-input-number
                      :min="1"
                      :max="10"
                      :default-value="1"
                    />
                  </template>
                </a-table>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="车辆费用">
                <span
                  class="ant-form-text"
                  style="font-size:20px;color:red;"
                >
                  1200元
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-form>
    <template slot="footer">
      <h2 style="float:left;color:red;">总报价：80000元</h2>
      <a-button
        key="back"
        @click="handleCancel"
      >
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  data () {
    return {
      columns_car: [
        {
          title: '车型',
          dataIndex: 'name'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '数量',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '总计',
          dataIndex: 'total'
        }
      ],
      columns_route: [
        {
          title: '坐标',
          dataIndex: 'location',
          width: '40%',
          scopedSlots: { customRender: 'location' }
        },
        {
          title: '门牌号',
          dataIndex: 'room_number',
          width: '20%',
          scopedSlots: { customRender: 'room_number' }
        },
        {
          title: '电梯或楼梯',
          dataIndex: 'stairs_or_elevators',
          scopedSlots: { customRender: 'stairs_or_elevators' }
        },
        {
          title: '楼层数',
          dataIndex: 'floor_num',
          scopedSlots: { customRender: 'floor_num' },
          width: '80px'
        },
        {
          title: '停车位距离',
          dataIndex: 'parking_distance',
          scopedSlots: { customRender: 'parking_distance' },
          width: '120px'
        }
      ],
      columns_onoff: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '数量',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '总计',
          dataIndex: 'total'
        }
      ],
      columns_large: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '数量',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '总计',
          dataIndex: 'total'
        }
      ],
      dataSource: ['Burns Bay Road', 'Downing Street', 'Wall Street'],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      cars: [
        {
          key: '1',
          name: 'John Brown',
          price: 300,
          total: 0
        },
        {
          key: '2',
          name: 'Jim Green',
          price: 400,
          total: 0
        },
        {
          key: '3',
          name: 'Joe Black',
          price: 400,
          total: 0
        }
      ],
      route: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          price: 300,
          total: 0
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          price: 400,
          total: 0
        }
      ],
      onoff: [],
      large: []
    }
  },
  methods: {
    moment,
    add () {
      this.visible = true
    },
    test () {
      alert('sss')
    },
    edit (record) {
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style>
.editable-add-btn {
  margin-bottom: 8px;
}
.ant-form-item {
  margin-bottom: 12px;
}
</style>
