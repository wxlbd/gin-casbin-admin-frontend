import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

interface RoleParams {
  name?: string;
  code?: string;
  status?: string | number;
  pageNum?: number;
  pageSize?: number;
}

export interface RoleData {
  id?: number;
  name: string;
  code: string;
  status: number;
  remark: string;
}

// 获取角色列表
export const getRoles = (params?: RoleParams) => {
  return http.request<HttpResponse<any>>("get", "/api/v1/system/role", {
    params
  });
};

// 新增角色
export const addRole = (data: RoleData) => {
  return http.request<HttpResponse<any>>("post", "/api/v1/system/role", {
    data
  });
};

// 修改角色
export const updateRole = (data: RoleData) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/role/${data.id}`,
    {
      data
    }
  );
};

// 删除角色
export const deleteRole = (ids: number[]) => {
  return http.request<HttpResponse<any>>(
    "delete",
    `/api/v1/system/role/${ids.join(",")}`
  );
};

// 获取角色的菜单权限列表
export const getRoleMenus = (roleId: number) => {
  return http.request<HttpResponse<RoleData[]>>(
    "get",
    `/api/v1/system/role/${roleId}/menus`
  );
};

// 保存角色的菜单权限
export const updateRoleMenu = (roleId: number, menuIds: number[]) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/role/${roleId}/menus`,
    {
      data: menuIds
    }
  );
};
// 获取所有角色
export const getAllRoles = () => {
  return http.request<HttpResponse<any>>("get", "/api/v1/system/role/all");
};
