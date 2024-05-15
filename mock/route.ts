import setProductRoute from './routes/product';
import setUserRoute from './routes/user';
import cors from 'cors';
import express from 'express';

const router = express.Router();

router.all('*', cors());

router.get('/', (req, res) => {
  console.log('Test GET');
  res.send(`此路徑是: localhost:9090/api`);
});

setUserRoute(router);
setProductRoute(router);

export default router;
