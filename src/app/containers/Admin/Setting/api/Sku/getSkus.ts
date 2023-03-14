// import axios from 'utils/axios';

import { SkuQueryPayload } from "models/sku";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getSkus = async (sku: SkuQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getSkusApi)
  const { data } = await api.post(sku);
  return data;
};