// import axios from 'utils/axios';

import { SupportCreatePayload } from "models/support";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createSupport = async (support: SupportCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createSupportApi)
  const data = await api.post(support);
  return data;
};