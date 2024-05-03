/**
 *
 */
export interface IUserProfileReq {
  username: string;
  password: string;
}

/** */
export interface IUserProfile {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  introduction: string;
  roles: string[];
}
