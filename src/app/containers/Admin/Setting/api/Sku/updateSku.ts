// import axios from 'utils/axios';

import { SkuUpdatePayload } from "models/sku";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateSku = async (sku: SkuUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateSkuApi)
  const data = await api.post(sku);
  return data;
};