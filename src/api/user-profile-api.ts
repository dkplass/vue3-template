import axios from 'axios';
import type { UserProfileReqType, UserProfileResType } from '@/type/user-profile-type';

export default {
  /**
   *
   * @param payload
   * @returns
   */
  doGetUserProfile: async function (payload: UserProfileReqType): Promise<UserProfileResType> {
    const result = await axios.post('', payload);
    return result.data.body;
  }
};
