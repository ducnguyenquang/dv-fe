// import axios from 'utils/axios';

import { ProductQueryPayload } from "models/product";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getProducts = async (product: ProductQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getClientProductsApi)
  const data = await api.post(product);
  return data;
};