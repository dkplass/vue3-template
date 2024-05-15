import { RolesType } from '@/interface/IUserProfile';
import { useUserProfileStore } from '@/stores/userProfile';

/**
 * 判斷是否有權限
 * @param value 身份組
 * @returns 是否有權限
 */
export const checkPermission = (value: (keyof typeof RolesType)[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const userProfileStore = useUserProfileStore();
    const roles = userProfileStore.userProfile.roles;
    const permissionRoles = value;

    return roles.some((role) => {
      return permissionRoles.includes(role);
    });
  } else {
    return false;
  }
};
