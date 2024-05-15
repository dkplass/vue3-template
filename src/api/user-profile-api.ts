import axios from 'axios';
import type { IUserProfileReq, IUserProfile, RolesType } from '@/interface/IUserProfile';

export default {
  /**
   *
   * @param payload
   * @returns
   */
  doLogin: async function (payload: IUserProfileReq): Promise<string> {
    const result = await axios.post('/user/login', payload);
    return result.data.body;
  },

  /**
   *
   * @param payload
   * @returns
   */
  doGetUserProfile: async function (): Promise<IUserProfile> {
    const result = await axios.post('/user/getUserProfile');
    return result.data.body;
  },

  /**
   *
   */
  doChangeRole: async function (payload: { role: keyof typeof RolesType }): Promise<void> {
    const result = await axios.post('/user/changeRole', payload);
    return result.data.body;
  },

  /**
   *
   * @returns
   */
  doLogout: async function (): Promise<void> {
    const result = await axios.post('/user/logout');
    return result.data;
  }
};
