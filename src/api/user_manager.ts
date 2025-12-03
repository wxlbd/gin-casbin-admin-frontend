import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

interface UserParams {
  username?: string;
  phone?: string;
  status?: string | number;
  deptId?: string | number;
  pageNum?: number;
  pageSize?: number;
}

// 获取用户列表
export const getUserList = (params?: UserParams) => {
  return http.request<HttpResponse<any>>("get", "/api/v1/system/user", {
    params
  });
};

// 新增用户
export const addUser = (data: any) => {
  return http.request<HttpResponse<any>>("post", "/api/v1/system/user", {
    data
  });
};

// 修改用户
export const updateUser = (data: any) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/user/${data.id}`,
    {
      data
    }
  );
};

// 删除用户
export const deleteUser = (ids: number[]) => {
  return http.request<HttpResponse<any>>(
    "delete",
    `/api/v1/system/user/${ids.join(",")}`
  );
};

// 获取用户的角色
export const getUserRoleIds = (userId: number) => {
  return http.request<HttpResponse<any>>(
    "get",
    `/api/v1/system/user/${userId}/roles`
  );
};

// 更新用户密码
export const updateUserPassword = (userId: number, password: string) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/user/${userId}/password`,
    {
      data: { password }
    }
  );
};
