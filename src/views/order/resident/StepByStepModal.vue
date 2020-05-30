<template>
  <a-modal
    title="新增订单"
    :width="960"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bodyStyle="{padding:'12px'}"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="ceshi">
      <a-tabs default-active-key="1" tabPosition="left">
        <a-tab-pane key="1" tab="预约与车辆">
          <a-form-item
            label="预约"
          >
            <a-form-item :style="{ display: 'inline-block', width: 'calc(20%)' }">
              <a-date-picker @change="onChange" />
            </a-form-item>
            <a-form-item
              label="时间段"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 8 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 16 }
              }"
              :style="{ display: 'inline-block', width: 'calc(30%)' }">
              <a-select default-value="lucy" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  100米以上或地下室出入
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="车辆"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2" tab="起始地">
          <a-form-item
            label="起点"
          >
            <a-form-item :style="{ display: 'inline-block', width: 'calc(45%)' }">
              <a-auto-complete
                :data-source="dataSource"
                :filter-option="filterOption"
              >
                <a-input>
                  <a-icon slot="suffix" type="search" class="certain-category-icon" @click="test"/>
                </a-input>
              </a-auto-complete>
            </a-form-item>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(13%)',padding:'0px 0px 0px 20px' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="层数"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 11 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 13 }
              }"
              :style="{ display: 'inline-block', width: 'calc(14%)'}">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
            <a-form-item
              label="距离"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 18 }
              }"
              :style="{ display: 'inline-block', width: 'calc(28%)' }">
              <a-select default-value="lucy" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  100米以上或地下室出入
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form-item>
          <!-- <a-form-item
            label="途径点"
          >
            <a-form-item :style="{ display: 'inline-block', width: 'calc(39%)' }">
              <a-auto-complete
                :data-source="dataSource"
                :filter-option="filterOption"
              />
            </a-form-item>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(19%)',padding:'0px 0px 0px 20px' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="层数"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 10 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 14 }
              }"
              :style="{ display: 'inline-block', width: 'calc(12%)'}">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
            <a-form-item
              label="距离"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 18 }
              }"
              :style="{ display: 'inline-block', width: 'calc(30%)' }">
              <a-select default-value="lucy" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  100米以上或地下室出入
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form-item> -->
          <a-form-item
            label="终点"
          >
            <a-form-item :style="{ display: 'inline-block', width: 'calc(45%)' }">
              <a-auto-complete
                :data-source="dataSource"
                :filter-option="filterOption"
              >
                <a-input>
                  <a-icon slot="suffix" type="search" class="certain-category-icon" @click="test"/>
                </a-input>
              </a-auto-complete>
            </a-form-item>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(13%)',padding:'0px 0px 0px 20px' }">
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  电梯
                </a-radio>
                <a-radio value="b">
                  楼梯
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="层数"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 11 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 13 }
              }"
              :style="{ display: 'inline-block', width: 'calc(14%)'}">
              <a-input-number :min="8" :max="12" />
            </a-form-item>
            <a-form-item
              label="距离"
              :labelCol="{
                xs: { span: 24 },
                sm: { span: 6 }
              }"
              :wrapperCol="{
                xs: { span: 24 },
                sm: { span: 18 }
              }"
              :style="{ display: 'inline-block', width: 'calc(28%)' }">
              <a-select default-value="lucy" >
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  100米以上或地下室出入
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form-item>
          <a-form-item
            label="实际距离"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              10.6km
            </span>
          </a-form-item>
          <a-form-item
            label="小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="3" tab="拆装">
          <a-form-item
            label="拆装"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="小计"
          >
            <span class="ant-form-text" style="font-size:20px;color:red;">
              1200元
            </span>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="4" tab="大件(非拆装)">
          <a-form-item
            label="大件"
          >
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="false">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <template slot="age" ><a-input-number/></template>
            </a-table>
          </a-form-item>
          <a-form-item
            label="小计"
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
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
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
    test () {
      alert('sss')
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
    margin-bottom: 2px;
}
.ant-input-number{
  width: 100%;
}
.ant-tabs /deep/ .ant-tabs-left-content {
    padding-left: 12px;
}
</style>
