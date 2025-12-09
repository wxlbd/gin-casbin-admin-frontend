import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

export type UserData = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
};

export type RefreshTokenData = {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
};

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

export type TableData = {
  /** 列表数据 */
  list: Array<any>;
  /** 总条目数 */
  total?: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 当前页数 */
  currentPage?: number;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<HttpResponse<UserData>>("post", "/api/v1/auth/login", {
    data
  });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<HttpResponse<RefreshTokenData>>(
    "post",
    "/api/v1/auth/refresh-token",
    { data }
  );
};

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return http.request<HttpResponse<UserInfo>>("get", "/api/v1/user/profile", {
    data
  });
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return http.request<HttpResponse<TableData>>("get", "/mine-logs", { data });
};

// 获取用户列表
export const getUserList = (data?: object) => {
  return http.request<HttpResponse<TableData>>("get", "/user", { data });
};

// 赋予用户角色
export const assignUserRole = (userId: number, roleIds: number[]) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/user/${userId}/roles`,
    {
      data: { roleIds }
    }
  );
};
