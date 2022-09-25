// import axios from 'utils/axios';

import { ProductCreatePayload } from "models/product";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createProduct = async (product: ProductCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createProductApi)
  const data = await api.post(product);
  return data;
};