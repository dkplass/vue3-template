import AppLayout from '@/layout/AppLayout.vue';
import Constructor from '@/views/pages/Constructor.vue';
import { shallowRef } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: AppLayout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/pages/Redirect.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/pages/Login.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: AppLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/playground',
    component: AppLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/PlayGround.vue'),
        name: 'playground',
        meta: {
          title: 'Playground',
          affix: true
        }
      }
    ]
  }
];

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: shallowRef(AppLayout),
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/Page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/Directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/Role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/icon',
    component: shallowRef(AppLayout),
    children: [
      {
        path: 'index',
        component: shallowRef(Constructor),
        name: 'Icons',
        meta: {
          title: 'icons',
          // icon: 'pi pi-fw pi-palette',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/example',
    component: shallowRef(AppLayout),
    redirect: '/example/list',
    meta: {
      title: 'example'
    },
    children: [
      {
        path: 'create',
        component: shallowRef(Constructor),
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'pi pi-fw pi-pen-to-square'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: shallowRef(Constructor),
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/example/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: shallowRef(Constructor),
        name: 'ArticleList',
        meta: {
          title: 'articleList',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '//github.com/dkplass/vue3-template',
    redirect: '',
    meta: {
      title: 'Github Page'
      // icon: 'pi pi-fw pi-external-link'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    meta: { hidden: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
});

export default router;
