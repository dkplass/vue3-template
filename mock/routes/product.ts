import { getProducts, getProductsSmall } from '../controllers/product';

export default (router: any) => {
  router.post('/product/getProducts', getProducts);

  router.post('/product/getProductsSmall', getProductsSmall);
};
