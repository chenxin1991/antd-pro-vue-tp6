<template>
  <a-modal
    title="新增订单"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-tabs default-active-key="1" tabPosition="left">
      <a-tab-pane key="1" tab="预约时间与车辆">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预约时间"
        >
          <a-date-picker @change="onChange" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车辆分配"
        >
          <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <template slot="age" >
              <a-input-number
              />
            </template>
          </a-table>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="起始地">
        Content of Tab 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="楼层">
        Content of Tab 3
      </a-tab-pane>
      <a-tab-pane key="4" tab="距离">
        Content of Tab 1
      </a-tab-pane>
      <a-tab-pane key="5" tab="拆装">
        Content of Tab 2
      </a-tab-pane>
      <a-tab-pane key="6" tab="大件">
        Content of Tab 3
      </a-tab-pane>
      <a-tab-pane key="7" tab="费用统计">
        Content of Tab 3
      </a-tab-pane>
    </a-tabs>
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
    title: '数量',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    scopedSlots: { customRender: 'age' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
export default {
  name: 'StepByStepModal',
  data () {
    return {
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
