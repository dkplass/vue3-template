import axios from 'axios';

export default {
  /**
   *
   */
  getProductsSmall: async function () {
    const result = await axios.get('/products');
    return result.data.body;
  },
  /**
   *
   */
  getProducts: async function () {
    const result = await axios.post('/api/products');
    console.log(result);
    return result.data.body;
  },
  /**
   *
   */
  getProductsMixed: async function () {
    const result = await axios.post('/getProductsMixed');
    return result.data.body;
  },
  /**
   *
   */
  getProductsWithOrdersSmall: async function () {
    const result = await axios.post('/getProductsWithOrdersSmall');
    return result.data.body;
  },
  /**
   *
   */
  getProductsWithOrdersLarge: async function () {
    const result = await axios.post('/getProductsWithOrdersLarge');
    return result.data.body;
  }
};
