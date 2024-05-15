import { useUserProfileStore } from '@/stores/userProfile';
import { type ObjectDirective } from 'vue';

export const permission: ObjectDirective = {
  created(el: HTMLElement, binging) {
    const { value } = binging;
    const userProfileStore = useUserProfileStore();
    const roles = userProfileStore.userProfile.roles;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.style.display = 'none';
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"");
    }
  }
};
