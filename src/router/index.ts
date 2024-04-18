import HomeView from '../views/HomeView.vue';
import { useUserProfileStore } from '@/stores/userProfile';
import { createRouter, createWebHistory } from 'vue-router';
import type { UserProfileResType } from '@/type/user-profile-type';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import('../views/Forbidden.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const profileStore = useUserProfileStore();

  // 往錯誤處理
  if (to.name === 'NotFound' || to.name === 'Forbidden') {
    return next();
  }

  // token 驗證
  // 登入重取userProfile
  if (!profileStore.userProfile.account) {
    profileStore.doGetUserProfile().then((userProfile: UserProfileResType) => {
      if (userProfile?.account) {
        profileStore.doStoreUserProfile(userProfile);
        return next();
      } else {
        profileStore.doResetUserProfile();
        return next();
      }
    });
  }

  return next();
});

export default router;
