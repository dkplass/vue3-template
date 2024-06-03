import { login, getUserProfile, changeRole, logout } from '../controllers/user';

export default (router: any) => {
  router.post('/user/login', login);

  router.post('/user/getUserProfile', getUserProfile);

  router.post('/user/changeRole', changeRole);

  router.post('/user/logout', logout);
};
