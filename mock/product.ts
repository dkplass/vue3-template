import productSmall from './data/products-small.json';
import product from './data/products.json';
import { IProduct } from '../src/interface/IProduct';
import { Response, Request } from 'express';

const productList: IProduct[] = product.data;

const productSmallList: IProduct[] = productSmall.data;

export const getProducts = (req: Request, res: Response) => {
  return res.json({
    code: 200,
    body: productList
  });
};

export const getProductsSmall = (req: Request, res: Response) => {
  return res.json({
    code: 200,
    body: productSmallList
  });
};
