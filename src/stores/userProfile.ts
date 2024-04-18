import userProfileApi from '@/api/user-profile-api';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { UserProfileReqType, UserProfileResType } from '@/type/user-profile-type';

const initUserProfile = {
  empName: '',
  empNo: '',
  auth: {}
} as Partial<UserProfileResType>;

export const useUserProfileStore = defineStore('user-profile', {
  state: () => ({
    userProfile: useStorage('userProfile', initUserProfile)
  }),
  getters: {},
  actions: {
    async doGetUserProfile() {
      const result = await userProfileApi.doGetUserProfile({} as UserProfileReqType);
      this.userProfile = result;
    }
  }
});
