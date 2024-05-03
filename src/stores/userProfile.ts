import userProfileApi from '@/api/user-profile-api';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { IUserProfile } from '@/interface/IUserProfile';

const initUserProfile = {
  name: '',
  avatarUrl: '',
  intro: '',
  roles: [],
  email: ''
} as Partial<IUserProfile>;

export const useUserProfileStore = defineStore('user-profile', {
  state: () => ({
    // userProfile: useStorage('userProfile', initUserProfile),
    // token: useStorage('token', '')
    userProfile: initUserProfile,
    token: ''
  }),
  getters: {},
  actions: {
    /** */
    setToken(payload: string) {
      this.token = payload;
    },
    /** */
    resetToken() {
      this.token = '';
    },
    /** */
    setUserProfile(payload: IUserProfile) {
      this.userProfile = payload;
    },
    /** */
    resetUserProfile() {
      this.userProfile = initUserProfile;
    },
    /** */
    async doLogin(payload: { username: string; password: string }) {
      const { username, password } = payload;
      const result = await userProfileApi.doLogin({ username, password });
      this.setToken(result);
    },
    /** */
    async doGetUserProfile() {
      if (this.token === '') {
        return Promise.reject('GetUserInfo: token is undefined!');
      }

      const result = await userProfileApi.doGetUserProfile();

      this.setUserProfile(result);
    },
    /** */
    async doChangeRole() {},
    /** */
    async doLogout() {
      await userProfileApi.doLogout();
      this.resetToken();
      this.resetUserProfile();
    }
  }
});
