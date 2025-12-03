import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";
import type { RouteRecordRaw } from "vue-router";

// 后端返回的菜单项接口
interface MenuItem {
  id: number;
  parentId: number;
  menuType: number;
  title: string;
  name: string;
  path: string;
  component: string;
  rank: number | null;
  redirect: string;
  icon: string;
  extraIcon: string;
  enterTransition: string;
  leaveTransition: string;
  activePath: string;
  auths: string;
  frameSrc: string;
  frameLoading: boolean;
  keepAlive: boolean;
  hiddenTag: boolean;
  fixedTag: boolean;
  showLink: boolean;
  showParent: boolean;
  status: number;
  createdAt: string;
  updatedAt: string;
  children: MenuItem[] | null;
}

// 转换菜单到路由
function transformMenuToRoute(menu: MenuItem): RouteRecordRaw {
  // 确保基础路由属性存在
  const route: RouteRecordRaw = {
    path: menu.path || "",
    name: menu.name,
    redirect: menu.redirect || "",
    component: menu.component || "Layout", // 默认使用 Layout 组件
    meta: {
      title: menu.title || menu.name,
      icon: menu.icon || "",
      rank: menu.rank || 0,
      showLink: menu.showLink ?? true,
      showParent: menu.showParent ?? false,
      keepAlive: menu.keepAlive ?? false,
      frameSrc: menu.frameSrc || "",
      frameLoading: menu.frameLoading ?? true,
      transition: {
        enterTransition: menu.enterTransition || "",
        leaveTransition: menu.leaveTransition || ""
      },
      hiddenTag: menu.hiddenTag ?? false,
      fixedTag: menu.fixedTag ?? false,
      auths: menu.auths ? menu.auths.split(",").filter(Boolean) : [],
      type: menu.menuType
    }
  };

  // 处理子路由
  if (menu.children && menu.children.length > 0) {
    // 只转换类型为菜单的子项
    const childrenRoutes = menu.children
      .filter(child => child.menuType === 1)
      .map(child => transformMenuToRoute(child));

    if (childrenRoutes.length > 0) {
      route.children = childrenRoutes;

      // 如果没有重定向，默认重定向到第一个子路由
      if (!route.redirect && childrenRoutes[0]?.path) {
        route.redirect = childrenRoutes[0].path;
      }
    }
  }

  return route;
}

// 转换整个菜单数组
function transformRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  // 只转换类型为菜单的项
  return menus
    .filter(menu => menu.menuType === 1)
    .map(menu => transformMenuToRoute(menu));
}

// 获取异步路由
export const getAsyncRoutes = () => {
  return http
    .request<HttpResponse<MenuItem[]>>("get", "/api/v1/user/profile/menus")
    .then(res => {
      console.log("转换前:", res.data);
      const routes = transformRoutes(res.data);
      console.log("转换后:", routes);
      return {
        ...res,
        data: routes
      };
    });
};
