import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { transformI18n } from "@/plugins/i18n";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps } from "../utils/types";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { cloneDeep, isAllEmpty, deviceDetection } from "@pureadmin/utils";
import { updateMenu, getMenus, addMenu, deleteMenu } from "@/api/menu";
import type { HttpResponse } from "@/utils/http/types.d";
import { MenuTypeEnum } from "./types";

export function useMenu() {
  const form = reactive({
    title: "",
    pageNum: 1,
    pageSize: 10
  });
  // 分页数据
  const pagination = reactive({
    total: 0,
    pageNum: 1,
    pageSize: 9999
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const getMenuType = (type: MenuTypeEnum, text = false) => {
    switch (type) {
      case MenuTypeEnum.MENU:
        return text ? "菜单" : "primary";
      case MenuTypeEnum.IFRAME:
        return text ? "iframe" : "warning";
      case MenuTypeEnum.LINK:
        return text ? "外链" : "danger";
      case MenuTypeEnum.BUTTON:
        return text ? "按钮" : "info";
      default:
        return text ? "未知" : "";
    }
  };

  const columns: TableColumnList = [
    {
      label: "菜单名称",
      prop: "title",
      align: "left",
      cellRenderer: ({ row }) => (
        <span>
          <span class="inline-block mr-1">
            {h(useRenderIcon(row.icon), {
              style: { paddingTop: "1px" }
            })}
          </span>
          <span>{transformI18n(row.title)}</span>
        </span>
      )
    },
    {
      label: "菜单类型",
      prop: "menuType",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={getMenuType(row.menuType)}
          effect="plain"
        >
          {getMenuType(row.menuType, true)}
        </el-tag>
      )
    },
    {
      label: "路由路径",
      prop: "path"
    },
    {
      label: "组件路径",
      prop: "component",
      formatter: ({ path, component }) =>
        isAllEmpty(component) ? path : component
    },
    {
      label: "权限标识",
      prop: "auths"
    },
    {
      label: "排序",
      prop: "rank",
      width: 100
    },
    {
      label: "隐藏",
      prop: "showLink",
      formatter: ({ showLink }) => (showLink ? "否" : "是"),
      width: 100
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const params = {
      title: form.title,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    };

    try {
      const res = await getMenus(params);
      if (res.code === 200 && res.data) {
        // 更新分页总数
        pagination.total = res.data.total;
        // 处理返回的列表数据
        const list = res.data.list || [];
        // 转换成树形结构
        dataList.value = handleTree(list);
      }
    } catch (error) {
      console.error("获取菜单列表失败:", error);
    } finally {
      loading.value = false;
    }
  }

  // 处理分页变化
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.pageNum = val;
    onSearch();
  }

  function formatHigherMenuOptions(treeList) {
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].title = transformI18n(treeList[i].title);
      formatHigherMenuOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}菜单`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          menuType: row?.menuType ?? MenuTypeEnum.MENU,
          higherMenuOptions: formatHigherMenuOptions(cloneDeep(dataList.value)),
          parentId: row?.parentId ?? 0,
          title: row?.title ?? "",
          name: row?.name ?? "",
          path: row?.path ?? "",
          component: row?.component ?? "",
          rank: row?.rank ?? 99,
          redirect: row?.redirect ?? "",
          icon: row?.icon ?? "",
          extraIcon: row?.extraIcon ?? "",
          enterTransition: row?.enterTransition ?? "",
          leaveTransition: row?.leaveTransition ?? "",
          activePath: row?.activePath ?? "",
          auths: row?.auths ?? "",
          frameSrc: row?.frameSrc ?? "",
          frameLoading: row?.frameLoading ?? true,
          keepAlive: row?.keepAlive ?? false,
          hiddenTag: row?.hiddenTag ?? false,
          fixedTag: row?.fixedTag ?? false,
          showLink: row?.showLink ?? true,
          showParent: row?.showParent ?? false
        }
      },
      width: "45%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const formData = FormRef.model; // 获取最新的表单数据
        function chores() {
          message(
            `您${title}了菜单名称为${transformI18n(formData.title)}的这条数据`,
            {
              type: "success"
            }
          );
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 从 formInline 和 formData 中排除 higherMenuOptions,避免发送整个菜单树
            const {
              higherMenuOptions: _higherMenuOptions1,
              ...formInlineWithoutOptions
            } = options.props.formInline;

            const {
              higherMenuOptions: _higherMenuOptions2,
              ...formDataWithoutOptions
            } = formData;

            const submitData = {
              ...formInlineWithoutOptions,
              ...formDataWithoutOptions,
              title: formData.title,
              auths: formData.auths,
              menuType: formData.menuType,
              parentId: formData.parentId
            };

            console.log("提交的数据:", submitData);

            if (title === "新增") {
              addMenu(submitData).then((res: HttpResponse<any>) => {
                if (res.code === 200) {
                  chores();
                }
              });
            } else {
              updateMenu(submitData).then((res: HttpResponse<any>) => {
                if (res.code === 200) {
                  chores();
                }
              });
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    deleteMenu([row.id]).then(() => {
      message(`您删除了菜单名称为${transformI18n(row.title)}的这条数据`, {
        type: "success"
      });
      onSearch();
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改菜单 */
    openDialog,
    /** 删除菜单 */
    handleDelete,
    handleSelectionChange,
    handleSizeChange,
    handleCurrentChange
  };
}
