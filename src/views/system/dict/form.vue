<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: 0,
    name: "",
    code: "",
    sort: 0,
    remark: "",
    status: 1
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="类型名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入类型名称"
      />
    </el-form-item>

    <el-form-item label="类型编码" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入类型编码"
      />
    </el-form-item>

    <el-form-item label="显示排序" prop="sort">
      <el-input-number
        v-model="newFormInline.sort"
        :min="0"
        :max="999"
        controls-position="right"
      />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="newFormInline.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="0">停用</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        type="textarea"
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
