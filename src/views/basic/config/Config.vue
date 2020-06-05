<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-divider orientation="left">
        报价设置
      </a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="300-500公里折扣">
            <a-input-number
              v-decorator="[
                'name',
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
                'load',
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
                'size',
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
                'volume',
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
                'description',
                {rules: [{ required: true, message: '请输入搬运说明' }]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="楼层说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入楼层说明' }]}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="距离说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入距离说明' }]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="拆装说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入拆装说明' }]}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="大件说明">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入大件说明' }]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="备注">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入备注' }]}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      form: this.$form.createForm(this)
    }
  }
}
</script>
