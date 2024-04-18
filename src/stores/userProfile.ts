import userProfileApi from '@/api/user-profile-api';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { UserProfileReqType, UserProfileResType } from '@/type/user-profile-type';

const initUserProfile = {
  name: '',
  account: '',
  auth: {}
} as Partial<UserProfileResType>;

export const useUserProfileStore = defineStore('user-profile', {
  state: () => ({
    userProfile: useStorage('userProfile', initUserProfile),
    token: useStorage('token', '')
  }),
  getters: {},
  actions: {
    async doGetUserProfile() {
      return await userProfileApi.doGetUserProfile({} as UserProfileReqType);
    },
    doStoreUserProfile(userProfile: UserProfileResType) {
      this.userProfile = userProfile;
    },
    doResetUserProfile() {
      this.userProfile = initUserProfile;
    }
  }
});
