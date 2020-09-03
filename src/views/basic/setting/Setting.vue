<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @submit="handleSubmit"
    >
      <a-divider orientation="left">
        报价设置
      </a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="300-500公里折扣">
            <a-input-number
              v-decorator="[
                'discount1',
                {
                  initialValue: '10',
                  rules: [{ required: true, message: '请输入300-500公里折扣！' }],
                },
              ]"
              style="width: 100%"
              :min="0"
              :max="10"
              :formatter="value => `${value}折`"
              :parser="value => value.replace('折', '')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="500公里以上折扣">
            <a-input-number
              v-decorator="[
                'discount2',
                {
                  initialValue: '10',
                  rules: [{ required: true, message: '请输入500公里以上折扣！' }],
                },
              ]"
              style="width: 100%"
              :min="0"
              :max="10"
              :formatter="value => `${value}折`"
              :parser="value => value.replace('折', '')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="19:00-23:00加收比例">
            <a-input-number
              v-decorator="[
                'add_ratio1',
                {
                  initialValue: '0',
                  rules: [{ required: true, message: '19:00-23:00加收比例！' }],
                },
              ]"
              style="width: 100%"
              :min="0"
              :max="100"
              :formatter="value => `${value}%`"
              :parser="value => value.replace('%', '')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="23:00-07:00加收比例">
            <a-input-number
              v-decorator="[
                'add_ratio2',
                {
                  initialValue: '0',
                  rules: [{ required: true, message: '请输入23:00-07:00加收比例！' }],
                },
              ]"
              style="width: 100%"
              :min="0"
              :max="100"
              :formatter="value => `${value}%`"
              :parser="value => value.replace('%', '')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">
        小程序文字说明
      </a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="搬运说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'carry_remark',
                {rules: [{ required: true, message: '请输入搬运说明' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="楼层说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'floor_remark',
                {rules: [{ required: true, message: '请输入楼层说明' }]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="距离说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'distance_remark',
                {rules: [{ required: true, message: '请输入距离说明' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="拆装说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'onoff_remark',
                {rules: [{ required: true, message: '请输入拆装说明' }]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="大件说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'large_remark',
                {rules: [{ required: true, message: '请输入大件说明' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="备注">
            <a-textarea
              rows="4"
              v-decorator="[
                'remark',
                {rules: [{ required: true, message: '请输入备注' }]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button
              type="primary"
              html-type="submit"
            >
              提交
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { getSetting, editSetting } from '@/api/basic/setting'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {}
    }
  },
  created () {
    getSetting({ id: 1 }).then(res => {
      this.mdl = Object.assign({}, res.result.data)
      this.form.setFieldsValue(
        pick(this.mdl, [
          'discount1',
          'discount2',
          'add_ratio1',
          'add_ratio2',
          'carry_remark',
          'floor_remark',
          'distance_remark',
          'onoff_remark',
          'large_remark',
          'remark'
        ])
      )
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const { $message } = this
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = 1
          editSetting(values)
            .then(res => {
              $message.success('修改成功')
            })
            .catch(err => {
              $message.error(`load user err: ${err.message}`)
            })
        }
      })
    }
  }
}
</script>
