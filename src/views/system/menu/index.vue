<script setup lang="ts">
import { ref } from "vue";
import { useMenu } from "./utils/hook";
import { transformI18n } from "@/plugins/i18n";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { MenuTypeEnum } from "./utils/types";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "SystemMenu"
});

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSelectionChange,
  handleSizeChange,
  handleCurrentChange
} = useMenu();

function onFullscreen() {
  // 重置表格高度
  tableRef.value.setAdaptive();
}
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="菜单名称：" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入菜单名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="菜单管理"
      :columns="columns"
      :isExpandAll="false"
      :tableRef="tableRef?.getTableRef()"
      @refresh="onSearch"
      @fullscreen="onFullscreen"
    >
      <template #buttons>
        <el-button
          v-auth="'system:menu:create'"
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增菜单
        </el-button>
      </template>
      <template #default="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 45 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
        >
          <template #operation="{ row }">
            <el-button
              v-auth="'system:menu:update'"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('修改', row)"
            >
              修改
            </el-button>
            <el-button
              v-show="row.menuType !== MenuTypeEnum.BUTTON"
              v-auth="'system:menu:create'"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(AddFill)"
              @click="openDialog('新增', { parentId: row.id } as any)"
            >
              新增
            </el-button>
            <el-popconfirm
              :title="`是否确认删除菜单名称为${transformI18n(row.title)}的这条数据${row?.children?.length > 0 ? '。注意下级菜单也会一并删除，请谨慎操作' : ''}`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  v-auth="'system:menu:delete'"
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>

        <!-- 分页组件 -->
        <!-- <div class="flex justify-end mt-4">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
