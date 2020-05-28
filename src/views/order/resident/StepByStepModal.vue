<template>
  <a-modal
    title="新增订单"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-tabs default-active-key="1" tabPosition="left">
        <a-tab-pane key="1" tab="预约时间与车辆">
          <a-form-item
            label="预约时间"
          >
            <a-date-picker @change="onChange" />
          </a-form-item>
          <a-form-item
            label="车辆分配"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="费用小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2" tab="起始地与搬入搬出">
          <a-form-item
            label="从哪里搬出"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item label="搬出楼层" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(40%)' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="层数" :style="{ display: 'inline-block', width: 'calc(60%)' }">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="搬出距离"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item
            label="途径点"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item label="搬出楼层" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(40%)' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="层数" :style="{ display: 'inline-block', width: 'calc(60%)' }">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="搬出距离"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item label="搬入楼层" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(40%)' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="层数" :style="{ display: 'inline-block', width: 'calc(60%)' }">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="搬入距离"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item
            label="搬到哪里去"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item label="搬入楼层" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block', width: 'calc(40%)' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="层数" :style="{ display: 'inline-block', width: 'calc(60%)' }">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="搬入距离"
          >
            <a-auto-complete
              :data-source="dataSource"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item
            label="导航距离"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              10.6km
            </span>
          </a-form-item>
          <a-form-item
            label="费用小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="3" tab="拆装">
          <a-form-item
            label="拆装明细"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="费用小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="4" tab="大件(非拆装)">
          <a-form-item
            label="大件明细"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="费用小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
    <template slot="footer">
      <h2 style="float:left;color:red;">总报价：80000元</h2>
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import pick from 'lodash.pick'
import moment from 'moment'
const stepForms = [
  ['name', 'desc'],
  ['target', 'template', 'type'],
  ['time', 'frequency']
]
const columns = [
  {
    title: '车型',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '数量',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '总计',
    dataIndex: 'total',
    key: 'total',
    align: 'center'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    price: 300,
    total: 0
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
    price: 400,
    total: 0
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    price: 400,
    total: 0
  }
]
export default {
  name: 'StepByStepModal',
  data () {
    return {
      dataSource: ['Burns Bay Road', 'Downing Street', 'Wall Street'],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      currentStep: 0,
      mdl: {},

      form: this.$form.createForm(this),
      data,
      columns
    }
  },
  methods: {
    moment,
    add () {
      this.visible = true
    },
    edit (record) {
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleNext (step) {
      const { form: { validateFields } } = this
      const currentStep = step + 1
      if (currentStep <= 2) {
        // stepForms
        validateFields(stepForms[ this.currentStep ], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      // last step
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          setTimeout(() => {
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    backward () {
      this.currentStep--
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
    },
    onChange (currentStep) {
      console.log('onChange:', currentStep)
      this.currentStep = currentStep
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-item {
    margin-bottom: 12px;
}
</style>
