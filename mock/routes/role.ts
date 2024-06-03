import { getRoles, createRole, updateRole, deleteRole, getRoutes } from '../controllers/role';

export default (router: any) => {
  router.get('/role/getRoles', getRoles);

  router.post('/role/createRole', createRole);

  router.post('/role/updateRole', updateRole);

  router.post('/role/deleteRole', deleteRole);

  router.get('/role/getRoutes', getRoutes);
};
