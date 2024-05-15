import { getProducts, getProductsSmall } from '../modules/product';

export default (router: any) => {
  router.post('/product/getProducts', getProducts);

  router.post('/product/getProductsSmall', getProductsSmall);
};
