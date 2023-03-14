// import axios from 'utils/axios';

import { SkuDetailPayload } from "models/sku";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const deleteSku = async (sku: SkuDetailPayload): Promise<any> => {
  if(sku) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.removeSkuApi}/${sku._id}`)
    const data = await api.get(sku);
    return data;
  } else {
    return null;
  }
};