import router from './index';
import { usePermissionStore } from '@/stores/permission';
import { useUserProfileStore } from '@/stores/userProfile';

const whiteList = ['/login', '/auth-redirect'];

/**
 * 無 key cloak
 */
export const defaultGurad = router.beforeEach(async (to, from, next) => {
  const userProfileStore = useUserProfileStore();
  const permissionStore = usePermissionStore();

  if (userProfileStore.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (userProfileStore.userProfile.roles && userProfileStore.userProfile.roles.length === 0) {
        //
        try {
          await userProfileStore.doGetUserProfile();
          const roles = userProfileStore.userProfile.roles;

          permissionStore.generateRoutes(roles);
          permissionStore.dynamicRoutes.forEach((route) => {
            router.addRoute(route);
          });

          next({ ...to, replace: true });
        } catch (error) {
          userProfileStore.resetToken();
          next(`/login?redirect=${to.path}`);
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

/**
 * 實現 key cloak
 */
export const keyCloakGuard = router.beforeEach((to, from, next) => {
  const profileStore = useUserProfileStore();

  // 往錯誤處理
  if (to.name === 'NotFound' || to.name === 'Forbidden') {
    return next();
  }

  // token 驗證
  // 登入重取userProfile
  // if (!profileStore.userProfile.account) {
  //   profileStore.doGetUserProfile().then((userProfile: UserProfileResType) => {
  //     if (userProfile?.account) {
  //       profileStore.doStoreUserProfile(userProfile);
  //       return next();
  //     } else {
  //       profileStore.doResetUserProfile();
  //       return next();
  //     }
  //   });
  // }

  return next();
});
