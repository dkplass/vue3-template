import { login, getUserProfile, logout } from '../user';

export default (router: any) => {
  router.post('/user/login', login);

  router.post('/user/getUserProfile', getUserProfile);

  router.post('/user/logout', logout);
};
