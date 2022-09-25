// import axios from 'utils/axios';

import { ProductUpdatePayload } from "models/product";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateProduct = async (product: ProductUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateProductApi)
  const data = await api.post(product);
  return data;
};