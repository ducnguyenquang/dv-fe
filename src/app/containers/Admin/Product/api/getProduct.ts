// import axios from 'utils/axios';

import { ProductDetailPayload } from "models/product";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getProduct = async (product: ProductDetailPayload): Promise<any> => {
  if(product.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getProductApi}/${product.id}`)
    const data = await api.get(product);
    return data;
  } else {
    return null;
  }
};