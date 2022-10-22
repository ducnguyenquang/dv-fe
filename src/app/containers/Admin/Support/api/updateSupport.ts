// import axios from 'utils/axios';

import { SupportUpdatePayload } from "models/support";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updateSupport = async (support: SupportUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updateSupportApi)
  const data = await api.post(support);
  return data;
};