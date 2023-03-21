import { ProductDetailPayload } from 'models/product';
import BaseService from 'services/api/baseApi';
import endPoint from 'services/api/endPoint.json';

export const deleteProduct = async (product: ProductDetailPayload): Promise<any> => {
  if (product) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getProductApi}/remove/${product}`);
    const data = await api.get(product);
    return data;
  } else {
    return null;
  }
};
