// import axios from 'utils/axios';

import { SupportQueryPayload } from "models/support";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const getSupports = async (support: SupportQueryPayload): Promise<any> => {

  const api = new BaseService(endPoint.backendUrl, endPoint.getSupportsApi)
  const data = await api.post(support);
  return data;
};