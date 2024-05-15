/**
 *
 */
export interface IUserProfileReq {
  username: string;
  password: string;
}

/** */
export interface IUserProfile {
  id: Nullable<number>;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  introduction: string;
  roles: (keyof typeof RolesType)[];
}

/** */
export enum RolesType {
  admin = 'admin',
  editor = 'editor',
  visitor = 'visitor'
}
