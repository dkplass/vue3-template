import { constantRoutes, asyncRoutes } from '@/router/index';
import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

export interface IPermissionState {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

/**
 * 動態篩選有權限的路由
 * @param routes 需判斷的路由數組
 * @param roles 角色權限組
 * @returns 路由樹
 */
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const result: RouteRecordRaw[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const r: RouteRecordRaw = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }

      result.push(r);
    }
  });

  return result;
};

/**
 * 判斷是否符合角色權限
 * @param roles 登入角色群組
 * @param route 需判斷的路由
 * @returns boolean 是否有權限
 */
const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
  if (route.meta && route.meta.roles) {
    const metaRoles = route.meta['roles'] as string[];
    return roles.some((role) => metaRoles.includes(role));
  } else {
    return true;
  }
};

export const usePermissionStore = defineStore('permission', {
  state: (): IPermissionState => ({
    routes: [],
    dynamicRoutes: []
  }),
  getters: {},
  actions: {
    /**
     * 設定路由
     * @param routes 路由樹
     */
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = constantRoutes.concat(routes);
      this.dynamicRoutes = routes;
    },
    /**
     * 組合所有路由
     * @param roles 角色權限
     */
    generateRoutes(roles: string[]) {
      let accessRoutes: RouteRecordRaw[];
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes;
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }

      this.setRoutes(accessRoutes);
    }
  }
});
