// import axios from 'utils/axios';

import { PageUpdatePayload } from "models/page";
import BaseService from "services/api/baseApi";
import endPoint from 'services/api/endPoint.json';

export const updatePage = async (page: PageUpdatePayload): Promise<any> => {
  const api = new BaseService(endPoint.backendUrl, endPoint.updatePageApi)
  const data = await api.post(page);
  return data;
};