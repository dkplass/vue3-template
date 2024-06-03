import setProductRoute from './product';
import setRoleRoute from './role';
import setUserRoute from './user';
import cors from 'cors';
import express from 'express';

const router = express.Router();

router.all('*', cors());

router.get('/', (req, res) => {
  console.log('Test GET');
  res.send(`此路徑是: localhost:9090/api`);
});

setProductRoute(router);
setRoleRoute(router);
setUserRoute(router);

export default router;
