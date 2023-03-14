// import axios from 'utils/axios';

import { SkuDetailPayload } from "models/sku";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getSku = async (sku: SkuDetailPayload): Promise<any> => {
  if(sku.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getSkuApi}/${sku.id}`)
    const data = await api.get(sku);
    return data;
  } else {
    return null;
  }
};