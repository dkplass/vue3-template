/**
 *
 */
export interface IUserProfileReq {
  username: string;
  password: string;
}

/** */
export interface IUserProfile {
  token: string;
  userid: string;
  name: string;
  avatarUrl: string;
  intro: string;
  roles: string[];
  email: string;
}
