// import axios from 'utils/axios';

import { PageCreatePayload } from "models/page";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const createPage = async (page: PageCreatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.createPageApi)
  const data = await api.post(page);
  return data;
};