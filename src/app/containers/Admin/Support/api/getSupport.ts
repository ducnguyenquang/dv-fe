// import axios from 'utils/axios';

import { SupportDetailPayload } from "models/support";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getSupport = async (support: SupportDetailPayload): Promise<any> => {
  if(support.id) {
    const api = new BaseService(endPoint.backendUrl, `${endPoint.getSupportApi}/${support.id}`)
    const data = await api.get(support);
    return data;
  } else {
    return null;
  }
};