import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

// 字典类型接口
export interface DictType {
  id?: number;
  code: string; // 字典类型编码
  name: string; // 字典名称
  status: number; // 状态
  sort: number; // 排序
  remark: string; // 备注
  createdAt?: string;
  updatedAt?: string;
}

// 字典数据接口
export interface DictData {
  id?: number;
  typeCode: string; // 字典类型编码
  label: string; // 字典标签
  value: string; // 字典键值
  status: number; // 状态
  sort: number; // 排序
  remark: string; // 备注
  createdAt?: string;
  updatedAt?: string;
}

// 字典类型接口
export interface DictTypeData {
  id: number;
  name: string;
  code: string;
  status: number;
  remark: string;
  createTime: string;
}

// 字典数据接口
export interface DictDataItem {
  id: number;
  dictType: string;
  label: string;
  value: string;
  sort: number;
  status: number;
  remark: string;
  createTime: string;
}

// 获取字典类型列表
export const getDictTypes = (params?: any) => {
  return http.request<HttpResponse<any>>("get", "/api/v1/system/dict-type", {
    params
  });
};

// 新增字典类型
export const addDictType = (data: DictType) => {
  return http.request<HttpResponse<any>>("post", "/api/v1/system/dict-type", {
    data
  });
};

// 修改字典类型
export const updateDictType = (data: DictType) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/dict-type/${data.id}`,
    { data }
  );
};

// 删除字典类型
export const deleteDictType = (ids: number[]) => {
  return http.request<HttpResponse<any>>(
    "delete",
    `/api/v1/system/dict-type/${ids.join(",")}`
  );
};

// 获取字典数据列表
export const getDictDataList = (params?: any) => {
  return http.request<HttpResponse<any>>("get", `/api/v1/system/dict-data`, {
    params
  });
};

// 新增字典数据
export const addDictData = (data: DictData) => {
  return http.request<HttpResponse<any>>("post", "/api/v1/system/dict-data", {
    data
  });
};

// 修改字典数据
export const updateDictData = (data: DictData) => {
  return http.request<HttpResponse<any>>(
    "put",
    `/api/v1/system/dict-data/${data.id}`,
    { data }
  );
};

// 删除字典数据
export const deleteDictData = (ids: number[]) => {
  return http.request<HttpResponse<any>>(
    "delete",
    `/api/v1/system/dict-data/${ids.join(",")}`
  );
};
