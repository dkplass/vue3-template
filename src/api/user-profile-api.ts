import axios from 'axios';
import type { IUserProfileReq, IUserProfile } from '@/interface/IUserProfile';

export default {
  /**
   *
   * @param payload
   * @returns
   */
  doLogin: async function (payload: IUserProfileReq): Promise<string> {
    const result = await axios.post('/login', payload);
    return result.data;
  },

  /**
   *
   * @param payload
   * @returns
   */
  doGetUserProfile: async function (): Promise<IUserProfile> {
    const result = await axios.post('/getUserProfile');
    return result.data.body;
  }
};
