// import axios from 'utils/axios';

import { SkuCreatePayload } from "models/sku";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createSku = async (sku: SkuCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createSkuApi)
  const data = await api.post(sku);
  return data;
};